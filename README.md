# 🎯 RAG Prompt Library

A curated, open-source collection of production-ready prompt templates for Retrieval-Augmented Generation (RAG) systems.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub Stars](https://img.shields.io/github/stars/itsumida/rag-prompt-library?style=social)](https://github.com/itsumida/rag-prompt-library)

**🌐 [View Marketing Page](https://itsumida.github.io/rag-prompt-library/)**

---

## 🚀 What is This?

Building RAG systems is hard. Crafting effective prompts is even harder. This library provides:

- **Production-ready prompts** tested in real-world applications
- **Structured templates** with system rules, context handling, and output formatting
- **Community-driven improvements** through GitHub PRs, reactions, and issues
- **Model-agnostic design** with specific optimizations for Claude, GPT, and open-source models

---

## 📚 Prompt Categories

### General Purpose

| Prompt | Description | Difficulty |
|--------|-------------|------------|
| [Question Answering](prompts/general/question-answering.md) | Accurate answers from retrieved documents | Beginner |
| [Document Summarization](prompts/general/document-summarization.md) | Synthesize key points from multiple sources | Beginner |
| [Conversational RAG](prompts/general/conversational-rag.md) | Multi-turn conversations with context memory | Intermediate |
| [Comparative Analysis](prompts/general/comparative-analysis.md) | Compare information across multiple documents | Intermediate |

### Technical

| Prompt | Description | Difficulty |
|--------|-------------|------------|
| [Code Documentation Search](prompts/technical/code-documentation-search.md) | Find and explain code examples | Intermediate |
| [API Reference Assistant](prompts/technical/api-reference-assistant.md) | Navigate API docs and generate examples | Intermediate |
| [Technical Troubleshooting](prompts/technical/technical-troubleshooting.md) | Debug using knowledge base articles | Advanced |

### Domain-Specific

| Prompt | Description | Difficulty |
|--------|-------------|------------|
| [Legal Document Analysis](prompts/domain-specific/legal-document-analysis.md) | Extract clauses and legal implications | Advanced |
| [Medical Literature Review](prompts/domain-specific/medical-literature-review.md) | Summarize research papers with citations | Advanced |
| [Customer Support Assistant](prompts/domain-specific/customer-support-assistant.md) | Resolve issues using help documentation | Intermediate |

---

## 🎨 Quick Start

### 1. Browse Prompts

Explore the [prompts directory](prompts/) or visit the [marketing page](https://itsumida.github.io/rag-prompt-library/).

### 2. Copy & Customize

Each prompt follows a consistent structure:

```markdown
## System Instructions
[Define AI behavior]

## Context Handling
[How to process retrieved documents]

## User Query Processing
[Handle user questions]

## Output Rules
[Format and quality requirements]
```

### 3. Integrate

Copy the template into your RAG pipeline and replace placeholders with your:
- Retrieved context
- User query
- Domain-specific requirements

---

## 💬 Community Feedback

We use GitHub's native features for community feedback:

### Vote on Prompts

Visit any prompt and use **GitHub reactions**:
- 👍 Works great in production
- 👎 Needs improvement
- ❤️ Love this prompt
- 🚀 Ready to deploy
- 👀 Interesting approach

### Suggest Improvements

[Open an issue](https://github.com/itsumida/rag-prompt-library/issues/new/choose) to:
- Suggest a new prompt
- Improve an existing prompt
- Report issues or edge cases
- Share your success story

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create** a new branch (`git checkout -b feature/amazing-prompt`)
3. **Follow** the [prompt template](templates/prompt-template.md)
4. **Test** your prompt in a real RAG system
5. **Submit** a pull request

Read our [Contributing Guidelines](CONTRIBUTING.md) for details.

---

## 🗺️ Roadmap

- [x] Launch with 10 core prompts
- [ ] Add 50+ community prompts
- [ ] Build prompt testing framework
- [ ] Create model-specific optimized versions
- [ ] Add interactive prompt builder
- [ ] Integrate upvote/downvote analytics dashboard

---

## 📖 Learn More

### What is RAG?

Retrieval-Augmented Generation combines:
1. **Retrieval**: Finding relevant documents from a knowledge base
2. **Augmentation**: Adding context to the user's query
3. **Generation**: Using an LLM to produce accurate, grounded responses

### Why Good Prompts Matter

A well-crafted RAG prompt:
- ✅ Reduces hallucinations
- ✅ Improves answer accuracy
- ✅ Handles missing information gracefully
- ✅ Maintains consistent output format
- ✅ Scales to production workloads

---

## 📊 Statistics

- **10 Prompts** (and growing)
- **3 Categories** (General, Technical, Domain-Specific)
- **100% Open Source**
- **Community-Driven**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with ❤️ by the community. Special thanks to all [contributors](https://github.com/itsumida/rag-prompt-library/graphs/contributors).

---

## 🔗 Links

- **Documentation**: [Marketing Page](https://itsumida.github.io/rag-prompt-library/)
- **Issues**: [GitHub Issues](https://github.com/itsumida/rag-prompt-library/issues)
- **Discussions**: [GitHub Discussions](https://github.com/itsumida/rag-prompt-library/discussions)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

[View Prompts](prompts/) • [Contribute](CONTRIBUTING.md) • [Report Issue](https://github.com/itsumida/rag-prompt-library/issues)

</div>
