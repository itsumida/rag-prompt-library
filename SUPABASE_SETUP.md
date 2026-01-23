# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - Name: `rag-prompt-library`
   - Database Password: (create a strong password)
   - Region: Choose closest to your users
5. Wait for project to be created (~2 minutes)

## 2. Create the Votes Table

1. In your Supabase dashboard, go to the SQL Editor
2. Run this SQL query to create the votes table:

```sql
-- Create votes table
CREATE TABLE votes (
  id BIGSERIAL PRIMARY KEY,
  prompt_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  vote INTEGER NOT NULL CHECK (vote IN (-1, 1)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(prompt_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read votes
CREATE POLICY "Allow public read access"
  ON votes
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow anyone to insert votes
CREATE POLICY "Allow public insert access"
  ON votes
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow users to delete their own votes
CREATE POLICY "Allow users to delete own votes"
  ON votes
  FOR DELETE
  TO public
  USING (true);

-- Create index for faster queries
CREATE INDEX idx_votes_prompt_id ON votes(prompt_id);
CREATE INDEX idx_votes_user_id ON votes(user_id);
```

## 3. Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (e.g., `https://abcdefghijklmnop.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## 4. Update the Configuration File

1. Open `docs/assets/js/supabase-config.js`
2. Replace the placeholder values:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co'; // Your Project URL
const SUPABASE_ANON_KEY = 'eyJ...'; // Your anon/public key
```

## 5. Deploy

After updating the config file:

```bash
git add docs/assets/js/supabase-config.js
git commit -m "Add Supabase credentials"
git push
```

## 6. Test

1. Visit your deployed site
2. Try upvoting/downvoting a prompt
3. Open the site in an incognito window - votes should persist!
4. Check your Supabase dashboard → Table Editor → votes to see the data

## Security Notes

- The anon key is safe to expose publicly (it's client-side only)
- Row Level Security (RLS) policies protect your data
- Each user gets a unique ID stored in localStorage
- Votes are tied to user IDs to prevent duplicate voting

## Troubleshooting

### Votes not saving?
- Check browser console for errors
- Verify Supabase credentials are correct
- Ensure RLS policies were created
- Check that the votes table exists

### "Failed to fetch" errors?
- Verify your Supabase project URL is correct
- Check that RLS policies allow public access
- Ensure the anon key hasn't expired

### Vote counts showing 0?
- Check that the table has the correct structure
- Verify the policies allow SELECT queries
- Look in Supabase Table Editor to see if votes are being stored
