CREATE TABLE
  public.redirects (
    uid text NOT NULL,
    url text NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now()
  );

ALTER TABLE
  public.redirects
ADD
  CONSTRAINT redirects_pkey PRIMARY KEY (uid)
