# Setup Guide

This guide will help you set up the RAG Prompt Library repository on GitHub and deploy the marketing page.

## 📋 Prerequisites

- GitHub account
- Git installed locally
- Text editor (VS Code, Sublime, etc.)

## 🚀 Quick Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `rag-prompt-library`
3. Make it **public**
4. **Do NOT** initialize with README, .gitignore, or license (we already have these)

### 2. Push Your Local Code

```bash
cd /Users/umidamurat/rag-prompt-library

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: RAG Prompt Library with 10 production prompts"

# Add your GitHub repository as remote
git remote add origin https://github.com/itsumida/rag-prompt-library.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important:** Replace `itsumida` with your actual GitHub username.

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Build and deployment**:
   - Source: Select **GitHub Actions**
4. The workflow will automatically deploy your site
5. Wait 2-3 minutes for deployment
6. Your site will be available at: `https://itsumida.github.io/rag-prompt-library/`

### 4. Update URLs in Files

You'll need to update placeholder URLs throughout the repository:

**Files to update:**
- `README.md` - Replace `itsumida` with your GitHub username
- `docs/index.html` - Replace all instances of `itsumida`
- `.github/ISSUE_TEMPLATE/config.yml` - Update GitHub URLs

**Quick find & replace:**
```bash
# macOS/Linux
find . -type f -name "*.md" -o -name "*.html" -o -name "*.yml" | xargs sed -i '' 's/itsumida/YOUR_ACTUAL_USERNAME/g'

# Or manually search and replace in your editor
```

### 5. Verify Deployment

1. Go to **Actions** tab in your repository
2. You should see a workflow run for "Deploy to GitHub Pages"
3. Wait for it to complete (green checkmark)
4. Visit `https://itsumida.github.io/rag-prompt-library/`

## 🎨 Customization

### Update Repository Info

**README.md:**
- Update badges with your repository URL
- Add your GitHub username to contributor links

**docs/index.html:**
- Update all GitHub links
- Customize hero text if desired
- Update footer information

### Add Your Branding

**Marketing Page (docs/index.html):**
- Change color scheme in `docs/assets/css/style.css` (CSS variables at top)
- Update hero gradient colors
- Modify logo icon

### Enable GitHub Discussions

1. Go to repository **Settings**
2. Scroll to **Features** section
3. Enable **Discussions**
4. Set up categories:
   - Q&A (for questions)
   - Ideas (for prompt suggestions)
   - Show and tell (for success stories)

## 📊 Enable Community Features

### GitHub Reactions

Reactions are automatically enabled on GitHub. Users can react to:
- Individual prompt files
- Issues
- Discussions

### Issue Templates

Already configured! Users will see options to:
- Suggest a new prompt
- Improve an existing prompt
- Ask questions (redirects to Discussions)

### Analytics (Optional)

Add Google Analytics to `docs/index.html`:

```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

## 🔄 Making Updates

### Adding New Prompts

1. Create new `.md` file in appropriate category folder
2. Follow `templates/prompt-template.md` structure
3. Add entry to `README.md` in the appropriate table
4. Add card to `docs/index.html` in the prompt grid
5. Commit and push

### Updating Marketing Page

1. Edit files in `docs/` directory
2. Test locally by opening `docs/index.html` in browser
3. Commit and push - GitHub Actions will auto-deploy

## 🐛 Troubleshooting

### Pages Not Deploying

**Check:**
1. GitHub Actions is enabled in repository settings
2. Pages source is set to "GitHub Actions"
3. Workflow completed successfully (green checkmark)
4. Wait 2-3 minutes after first deployment

**Common issues:**
- Typo in workflow file → Check `.github/workflows/pages.yml`
- Permissions error → Ensure Pages write permission is enabled
- 404 on site → Check that `docs/index.html` exists

### Broken Links

After setup, verify all links work:
```bash
# Test locally
cd docs
python3 -m http.server 8000
# Visit http://localhost:8000
```

Check:
- All GitHub links point to your repository
- Internal navigation works
- External links open correctly

## 📚 Next Steps

Once setup is complete:

1. **Share Your Library:**
   - Tweet about it
   - Share on relevant communities (Reddit, Discord, etc.)
   - Add to awesome-lists

2. **Monitor Community:**
   - Watch for issues and PRs
   - Respond to discussions
   - Review prompt submissions

3. **Improve Prompts:**
   - Test prompts in different RAG systems
   - Gather user feedback
   - Add model-specific optimizations

4. **Grow the Library:**
   - Accept community contributions
   - Add new prompt categories as needed
   - Keep documentation up to date

## 🤝 Maintenance

### Regular Tasks

**Weekly:**
- Review new issues and PRs
- Respond to discussions
- Test submitted prompts

**Monthly:**
- Update prompt templates with learnings
- Add new prompts based on community requests
- Update model-specific notes for new LLM versions

**Quarterly:**
- Review and update README
- Refresh marketing page if needed
- Archive outdated issues

## 📞 Need Help?

- Open an issue in your repository
- Check [GitHub Pages documentation](https://docs.github.com/en/pages)
- Review [GitHub Actions documentation](https://docs.github.com/en/actions)

---

## ✅ Setup Checklist

- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Enabled GitHub Pages
- [ ] Updated all `itsumida` placeholders
- [ ] Verified marketing page deployment
- [ ] Enabled GitHub Discussions
- [ ] Tested all links
- [ ] Updated README with your info
- [ ] Created first release/tag (optional)
- [ ] Shared the project!

**Congratulations! Your RAG Prompt Library is live! 🎉**
