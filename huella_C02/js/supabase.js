// js/supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://oeghuwvgpsbohdasfoxl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lZ2h1d3ZncHNib2hkYXNmb3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MzI0ODYsImV4cCI6MjA2NTAwODQ4Nn0.Nx6mtcndZP6bcjV-PPyVD865124ubCpMBKyta8tF4l8';

export const supabase = createClient(supabaseUrl, supabaseKey);
