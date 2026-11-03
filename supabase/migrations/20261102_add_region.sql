-- Tag orders and enquiries with the regional site they came from.
-- Run once in the Supabase SQL editor before setting `live: true` for a new region.
alter table orders    add column if not exists region text not null default 'ug';
alter table enquiries add column if not exists region text not null default 'ug';

create index if not exists orders_region_idx    on orders (region);
create index if not exists enquiries_region_idx on enquiries (region);
