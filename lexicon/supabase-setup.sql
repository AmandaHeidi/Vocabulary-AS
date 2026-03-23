-- 1. Crear tabla de palabras
create table public.words (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  word text not null,
  translation text not null,
  phonetic text,
  part_of_speech text,
  examples text[] default '{}',
  examples_es text[] default '{}',
  created_at timestamp with time zone default now()
);

-- 2. Habilitar Row Level Security
alter table public.words enable row level security;

-- 3. Políticas: cada usuario solo ve y modifica sus propias palabras
create policy "Users can view own words"
  on public.words for select
  using (auth.uid() = user_id);

create policy "Users can insert own words"
  on public.words for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own words"
  on public.words for delete
  using (auth.uid() = user_id);

-- 4. Índice para búsquedas rápidas
create index words_user_id_idx on public.words(user_id);
create index words_created_at_idx on public.words(created_at desc);
