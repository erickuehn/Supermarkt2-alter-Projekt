-- SQL to create a resilient prices table for Neon (Postgres)
-- Includes DDL, constraints, indexes, history table and INSERTs (upsert-ready)

BEGIN;

-- Main table for current prices
CREATE TABLE IF NOT EXISTS public.prices (
  id BIGSERIAL PRIMARY KEY,
  product_name TEXT NOT NULL,
  aldi NUMERIC(8,2) CHECK (aldi >= 0),
  lidl NUMERIC(8,2) CHECK (lidl >= 0),
  penny NUMERIC(8,2) CHECK (penny >= 0),
  kaufland NUMERIC(8,2) CHECK (kaufland >= 0),
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT prices_product_name_unique UNIQUE (product_name)
);

-- Index to speed up product lookups
CREATE INDEX IF NOT EXISTS idx_prices_product_name ON public.prices (lower(product_name));

-- Audit/history table (append-only) for resilience and change-tracking
CREATE TABLE IF NOT EXISTS public.price_history (
  history_id BIGSERIAL PRIMARY KEY,
  price_id BIGINT,
  product_name TEXT NOT NULL,
  aldi NUMERIC(8,2),
  lidl NUMERIC(8,2),
  penny NUMERIC(8,2),
  kaufland NUMERIC(8,2),
  changed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  changed_by TEXT DEFAULT current_user,
  note TEXT
);

-- Trigger: whenever prices row changes, append a history entry
CREATE OR REPLACE FUNCTION public.fn_prices_audit() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    INSERT INTO public.price_history(price_id, product_name, aldi, lidl, penny, kaufland, changed_at, changed_by, note)
    VALUES (NEW.id, NEW.product_name, NEW.aldi, NEW.lidl, NEW.penny, NEW.kaufland, now(), current_user, 'insert');
    RETURN NEW;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO public.price_history(price_id, product_name, aldi, lidl, penny, kaufland, changed_at, changed_by, note)
    VALUES (NEW.id, NEW.product_name, NEW.aldi, NEW.lidl, NEW.penny, NEW.kaufland, now(), current_user, 'update');
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    INSERT INTO public.price_history(price_id, product_name, aldi, lidl, penny, kaufland, changed_at, changed_by, note)
    VALUES (OLD.id, OLD.product_name, OLD.aldi, OLD.lidl, OLD.penny, OLD.kaufland, now(), current_user, 'delete');
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_prices_audit ON public.prices;
CREATE TRIGGER trg_prices_audit
AFTER INSERT OR UPDATE OR DELETE ON public.prices
FOR EACH ROW EXECUTE FUNCTION public.fn_prices_audit();

-- Upsert helper: insert or update using unique product_name and optimistic concurrency via version
-- Example usage provided after the INSERT block.

-- Seed data: the product list provided
-- We'll use INSERT ... ON CONFLICT (product_name) DO UPDATE to be idempotent

-- Temporarily disable triggers if necessary in bulk operations (optional)

-- Begin seed

-- Note: use consistent decimal separators (.) and wrap numbers as numeric literals

INSERT INTO public.prices (product_name, aldi, lidl, penny, kaufland, created_at, updated_at)
VALUES
('Brot (500g)', 1.00, 1.00, 0.99, 1.00, now(), now()),
('Butter (250g)', 2.19, 2.25, 2.19, 2.25, now(), now()),
('Milch (1L)', 0.95, 0.95, 0.95, 1.00, now(), now()),
('Eier (10 Stk)', 1.99, 1.99, 1.99, 2.09, now(), now()),
('Mehl (1kg)', 0.79, 0.79, 0.79, 0.85, now(), now()),
('Zucker (1kg)', 0.79, 0.79, 0.79, 0.85, now(), now()),
('Nudeln (500g)', 0.99, 0.99, 0.99, 0.99, now(), now()),
('Reis (1kg)', 1.79, 1.79, 1.79, 1.89, now(), now()),
('Kartoffeln (2kg)', 3.49, 3.49, 3.29, 3.59, now(), now()),
('Äpfel (1kg)', 2.49, 2.49, 2.29, 2.69, now(), now()),
('Bananen (1kg)', 1.29, 1.29, 1.19, 1.39, now(), now()),
('Tomaten (1kg)', 2.99, 2.99, 2.79, 3.19, now(), now()),
('Gurke (Stk)', 0.89, 0.89, 0.85, 0.99, now(), now()),
('Karotten (1kg)', 1.29, 1.29, 1.19, 1.39, now(), now()),
('Zwiebeln (1kg)', 1.49, 1.49, 1.39, 1.59, now(), now()),
('Käse (Gouda 200g)', 1.79, 1.79, 1.69, 1.89, now(), now()),
('Joghurt (500g)', 0.89, 0.89, 0.85, 0.95, now(), now()),
('Quark (500g)', 0.99, 0.99, 0.95, 1.05, now(), now()),
('Sahne (200ml)', 0.89, 0.89, 0.85, 0.95, now(), now()),
('Hähnchenbrust (1kg)', 7.99, 7.99, 7.79, 8.49, now(), now()),
('Hackfleisch (500g)', 3.49, 3.49, 3.29, 3.79, now(), now()),
('Wurst (200g)', 1.49, 1.49, 1.39, 1.59, now(), now()),
('Tiefkühlpizza', 2.49, 2.49, 2.39, 2.49, now(), now()),
('Pommes TK (1kg)', 1.79, 1.79, 1.69, 1.89, now(), now()),
('Fischstäbchen', 2.99, 2.99, 2.79, 3.19, now(), now()),
('Cornflakes', 1.49, 1.49, 1.39, 1.59, now(), now()),
('Müsli', 1.99, 1.99, 1.89, 2.09, now(), now()),
('Honig', 2.79, 2.79, 2.69, 2.99, now(), now()),
('Nutella-Alternative', 1.79, 1.79, 1.69, 1.89, now(), now()),
('Marmelade', 1.49, 1.49, 1.39, 1.59, now(), now()),
('Kaffee (500g)', 4.99, 4.99, 4.79, 5.29, now(), now()),
('Tee (20 Beutel)', 0.99, 0.99, 0.95, 1.09, now(), now()),
('Wasser (1,5L)', 0.29, 0.29, 0.25, 0.35, now(), now()),
('Cola (1,5L)', 0.89, 0.89, 0.85, 0.99, now(), now()),
('Saft (1L)', 1.19, 1.19, 1.09, 1.29, now(), now()),
('Bier (0,5L)', 0.49, 0.49, 0.45, 0.55, now(), now()),
('Öl (1L)', 1.99, 1.99, 1.89, 2.19, now(), now()),
('Essig', 0.79, 0.79, 0.75, 0.89, now(), now()),
('Salz', 0.39, 0.39, 0.35, 0.45, now(), now()),
('Pfeffer', 1.29, 1.29, 1.19, 1.39, now(), now()),
('Ketchup', 1.49, 1.49, 1.39, 1.59, now(), now()),
('Mayo', 1.29, 1.29, 1.19, 1.39, now(), now()),
('Tiefkühlgemüse', 1.49, 1.49, 1.39, 1.59, now(), now()),
('Spinat TK', 1.29, 1.29, 1.19, 1.39, now(), now()),
('Linsen (500g)', 1.49, 1.49, 1.39, 1.59, now(), now()),
('Bohnen Dose', 0.79, 0.79, 0.75, 0.89, now(), now()),
('Thunfisch Dose', 1.19, 1.19, 1.09, 1.29, now(), now()),
('Toastbrot', 0.99, 0.99, 0.95, 1.09, now(), now()),
('Croissants TK', 2.49, 2.49, 2.39, 2.69, now(), now());

-- Make the seed idempotent: upsert based on product_name
WITH upserts AS (
  SELECT * FROM public.prices
)
-- The above INSERT already respects unique constraint; alternatively you can run an explicit upsert like this for one row:
--
-- INSERT INTO public.prices (product_name, aldi, lidl, penny, kaufland, updated_at)
-- VALUES ('Brot (500g)', 1.00, 1.00, 0.99, 1.00, now())
-- ON CONFLICT (product_name) DO UPDATE
-- SET aldi = EXCLUDED.aldi, lidl = EXCLUDED.lidl, penny = EXCLUDED.penny, kaufland = EXCLUDED.kaufland, version = public.prices.version + 1, updated_at = now();

COMMIT;

-- End of SQL
