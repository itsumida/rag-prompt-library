# Contributing to RAG Prompt Library

First off, thank you for considering contributing to the RAG Prompt Library! 🎉

This is a community-driven project, and we welcome contributions of all kinds:
- New prompt templates
- Improvements to existing prompts
- Bug fixes and typo corrections
- Documentation enhancements
- Use case examples

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Prompt Guidelines](#prompt-guidelines)
- [Submission Process](#submission-process)
- [Style Guide](#style-guide)
- [Community](#community)

## 🤝 Code of Conduct

This project follows a simple code of conduct:
- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Assume good intentions

## 🎯 How Can I Contribute?

### Reporting Issues

Found a problem with a prompt? [Open an issue](https://github.com/itsumida/rag-prompt-library/issues/new/choose) and select the appropriate template.

### Suggesting New Prompts

Have an idea for a new prompt? Great! Consider:
1. Is this prompt significantly different from existing ones?
2. Has it been tested in a real RAG system?
3. Will it benefit the broader community?

If yes, [open a prompt suggestion issue](https://github.com/itsumida/rag-prompt-library/issues/new?template=prompt-suggestion.md).

### Improving Existing Prompts

See ways to improve a prompt? Perfect! You can:
1. [Open an improvement issue](https://github.com/itsumida/rag-prompt-library/issues/new?template=prompt-improvement.md) to discuss
2. Or directly submit a pull request with your changes

### Adding Model-Specific Variations

Tested a prompt with a specific model and have optimizations? Add them to the "Model-Specific Notes" section!

## 📝 Prompt Guidelines

All prompts must meet these quality standards:

### 1. Structure

Follow the [prompt template](templates/prompt-template.md) structure:
- Metadata (category, difficulty, date)
- "When to Use" section
- Complete prompt template (system, context, query, output)
- Working example with realistic data
- Tips & best practices
- Model-specific notes
- Related prompts

### 2. Quality Requirements

- ✅ **Tested:** Must be tested in a real RAG system
- ✅ **Complete:** Include all sections from the template
- ✅ **Clear:** Use plain language; avoid unnecessary jargon
- ✅ **Practical:** Provide working examples, not just theory
- ✅ **Documented:** Explain why, not just what

### 3. Categories

Place your prompt in the appropriate category:

- **General:** Widely applicable across domains
- **Technical:** Software development, APIs, code
- **Domain-Specific:** Industry-specific use cases (legal, medical, finance, etc.)

If your prompt doesn't fit existing categories, suggest a new one in your PR.

### 4. Difficulty Levels

- **Beginner:** Simple, straightforward use cases
- **Intermediate:** More nuanced, requires some RAG experience
- **Advanced:** Complex scenarios, edge cases, specialized domains

## 🚀 Submission Process

### Quick Changes (Typos, Small Fixes)

1. Fork the repository
2. Make your changes
3. Submit a pull request with a clear description

### New Prompts or Major Changes

1. **Discuss first:** Open an issue to discuss your idea
2. **Get feedback:** Wait for maintainer/community feedback
3. **Fork & create branch:**
   ```bash
   git checkout -b feature/my-new-prompt
   ```
4. **Create your prompt:** Follow the template structure
5. **Test thoroughly:** Verify your prompt works in a real RAG system
6. **Add example:** Include a realistic, working example
7. **Update README:** Add your prompt to the appropriate table
8. **Commit:**
   ```bash
   git commit -m "Add [Prompt Name] for [use case]"
   ```
9. **Push:**
   ```bash
   git push origin feature/my-new-prompt
   ```
10. **Submit PR:** Create a pull request with detailed description

### Pull Request Checklist

Before submitting, ensure:

- [ ] Follows the [prompt template](templates/prompt-template.md)
- [ ] Includes working example with realistic data
- [ ] Has been tested in a real RAG system
- [ ] Added to README.md in appropriate category table
- [ ] All links work correctly
- [ ] Markdown formatting is correct
- [ ] No typos or grammatical errors
- [ ] Includes "When to Use" explanation
- [ ] Has model-specific notes for at least one model
- [ ] Follows style guide (see below)

## 🎨 Style Guide

### Writing Style

- **Clear and Concise:** Get to the point quickly
- **Active Voice:** "Use this prompt when..." not "This prompt should be used when..."
- **Practical:** Focus on real-world application
- **Inclusive:** Use "they/them" for generic users
- **Examples:** Show, don't just tell

### Code Examples

```python
# Good: Complete, runnable example
import requests

api_key = "your-api-key"
response = requests.get(
    "https://api.example.com/data",
    headers={"Authorization": f"Bearer {api_key}"}
)
```

```python
# Bad: Incomplete snippet
response = requests.get(...)  # Missing details
```

### Markdown Formatting

- Use `**bold**` for important terms
- Use `code blocks` for code, prompts, and commands
- Use `> blockquotes` for important callouts
- Use emoji sparingly and consistently (📋 🎯 💡 🔄)
- Keep line length reasonable (80-120 characters when possible)

### Prompt Examples

When showing prompt templates:

````markdown
```
[Show the actual prompt text here]
Use clear placeholders like {user_question} or [retrieved_documents]
```
````

### File Naming

- Use kebab-case: `my-prompt-name.md`
- Be descriptive: `code-documentation-search.md` not `code-search.md`
- No spaces or special characters

## 🧪 Testing Your Prompt

Before submitting, test your prompt:

1. **Real RAG System:** Use it in an actual RAG pipeline
2. **Multiple Queries:** Test with various user questions
3. **Edge Cases:** Try ambiguous queries, missing context, contradictory info
4. **Multiple Models:** If possible, test with Claude, GPT-4, or open-source models
5. **Different Context Sizes:** Test with 1, 3, and 10+ retrieved documents

Document your testing in the PR description:
- What RAG system did you use?
- What model(s) did you test with?
- What worked well?
- What are known limitations?

## 📊 Review Process

1. **Automated Checks:** GitHub Actions will check formatting and links
2. **Maintainer Review:** A maintainer will review your contribution
3. **Community Feedback:** Community members may provide suggestions
4. **Iteration:** Make requested changes if needed
5. **Merge:** Once approved, your contribution will be merged!

Reviews typically happen within 3-5 days. Be patient and responsive to feedback.

## 🎓 Learning Resources

New to RAG or prompt engineering? Check out:

- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [RAG Overview](https://www.anthropic.com/news/contextual-retrieval) (Anthropic blog)

## 💬 Community

- **Discussions:** Use [GitHub Discussions](https://github.com/itsumida/rag-prompt-library/discussions) for questions
- **Issues:** Use [GitHub Issues](https://github.com/itsumida/rag-prompt-library/issues) for bugs and suggestions
- **Feedback:** React to prompts with 👍 👎 ❤️ to show what works

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Thank You!

Your contributions make this library valuable for everyone. Thank you for helping the community!

**Questions?** Open a [discussion](https://github.com/itsumida/rag-prompt-library/discussions) or reach out to the maintainers.

---

<div align="center">

**Ready to contribute?** [Open an issue](https://github.com/itsumida/rag-prompt-library/issues/new/choose) or [submit a PR](https://github.com/itsumida/rag-prompt-library/compare)!

</div>
