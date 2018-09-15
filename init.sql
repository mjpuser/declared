create extension "uuid-ossp";
create table public.todos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  done boolean not null default false,
  task text not null,
  due timestamptz
);
