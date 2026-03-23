import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useWords(userId) {
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchWords = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    const { data, error } = await supabase
      .from('words')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (!error) setWords(data || [])
    setLoading(false)
  }, [userId])

  useEffect(() => { fetchWords() }, [fetchWords])

  const addWord = async (wordData) => {
    const { data, error } = await supabase
      .from('words')
      .insert([{ ...wordData, user_id: userId }])
      .select()
      .single()
    if (!error) setWords(prev => [data, ...prev])
    return { data, error }
  }

  const deleteWord = async (id) => {
    const { error } = await supabase.from('words').delete().eq('id', id)
    if (!error) setWords(prev => prev.filter(w => w.id !== id))
    return { error }
  }

  return { words, loading, addWord, deleteWord, refetch: fetchWords }
}
