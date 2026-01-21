# Quick Start Guide

Get started with RAG Prompt Library in 5 minutes.

## 🎯 Using a Prompt

### 1. Choose Your Prompt

Browse the [prompt library](prompts/) or visit the [marketing page](https://itsumida.github.io/rag-prompt-library/) to find a prompt that matches your use case.

**Categories:**
- **General:** Question answering, summarization, conversations
- **Technical:** Code search, API docs, troubleshooting
- **Domain-Specific:** Legal, medical, customer support

### 2. Copy the Template

Each prompt has four main sections to copy:

```markdown
## System Instructions
[Define AI behavior and principles]

## Context Handling
[How to process retrieved documents]

## User Query Processing
[Handle the user's question]

## Output Rules
[Format and structure the response]
```

### 3. Customize for Your Use Case

Replace placeholders with your actual data:

**Example - Question Answering:**

```python
# Your RAG pipeline
retrieved_docs = retrieve_documents(user_query)

# Format context from your documents
context = "<context>\n"
for i, doc in enumerate(retrieved_docs):
    context += f'<document index="{i+1}" source="{doc.source}">\n'
    context += f'{doc.content}\n'
    context += '</document>\n'
context += "</context>"

# Combine with prompt template
system_prompt = """
You are a precise question-answering assistant...
[copy from template]
"""

user_prompt = f"""
{context}

<question>
{user_query}
</question>
"""

# Send to your LLM
response = llm.generate(system_prompt, user_prompt)
```

### 4. Test and Iterate

1. Test with real queries from your domain
2. Adjust instructions based on results
3. Fine-tune output formatting
4. Test edge cases (missing info, contradictions)

## 🛠️ Integration Examples

### Claude (Anthropic API)

```python
import anthropic

client = anthropic.Anthropic(api_key="your-api-key")

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    system=system_prompt,  # From template
    messages=[
        {"role": "user", "content": user_prompt}
    ]
)

print(message.content)
```

### OpenAI API

```python
from openai import OpenAI

client = OpenAI(api_key="your-api-key")

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
)

print(response.choices[0].message.content)
```

### LangChain

```python
from langchain.chat_models import ChatAnthropic
from langchain.prompts import ChatPromptTemplate
from langchain.schema import SystemMessage, HumanMessage

llm = ChatAnthropic(model="claude-3-5-sonnet-20241022")

messages = [
    SystemMessage(content=system_prompt),
    HumanMessage(content=user_prompt)
]

response = llm(messages)
print(response.content)
```

### LlamaIndex

```python
from llama_index import VectorStoreIndex, ServiceContext
from llama_index.llms import Anthropic

llm = Anthropic(model="claude-3-5-sonnet-20241022")
service_context = ServiceContext.from_defaults(llm=llm)

# Use custom prompt
from llama_index.prompts import PromptTemplate

qa_prompt = PromptTemplate(
    system_prompt + "\n\n" +
    "Context: {context_str}\n\n"
    "Question: {query_str}\n\n"
    "Answer:"
)

index = VectorStoreIndex.from_documents(
    documents,
    service_context=service_context
)

query_engine = index.as_query_engine(
    text_qa_template=qa_prompt
)

response = query_engine.query("Your question here")
```

## 📊 Real-World Example

### Building a Documentation Q&A System

**1. Choose Prompt:** [Question Answering](prompts/general/question-answering.md)

**2. Set Up Retrieval:**

```python
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# Load your docs
docs = load_documentation()

# Create embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode([doc.content for doc in docs])

# Build FAISS index
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(embeddings)

def retrieve_documents(query, k=3):
    query_embedding = model.encode([query])
    distances, indices = index.search(query_embedding, k)
    return [docs[i] for i in indices[0]]
```

**3. Implement RAG Pipeline:**

```python
import anthropic

def answer_question(question):
    # Retrieve relevant docs
    retrieved = retrieve_documents(question, k=5)

    # Format context
    context = "<context>\n"
    for i, doc in enumerate(retrieved):
        context += f'<document index="{i+1}" source="{doc.title}">\n'
        context += f'{doc.content}\n</document>\n'
    context += "</context>"

    # System prompt from template
    system_prompt = """
    You are a precise question-answering assistant. Your role is to provide
    accurate, evidence-based answers using only the information from the
    retrieved documents.

    Core principles:
    - Answer ONLY what can be verified from the provided context
    - Never invent, assume, or extrapolate information
    - If the answer isn't in the context, explicitly state that
    - Cite sources when possible
    - Be concise but complete
    """

    # User prompt
    user_prompt = f"""
    {context}

    <question>
    {question}
    </question>

    Format your response as follows:

    **Answer:** [Direct, concise answer]

    **Explanation:** [Supporting details from the documents]

    **Sources:** [List the document indices used]
    """

    # Call LLM
    client = anthropic.Anthropic()
    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        system=system_prompt,
        messages=[{"role": "user", "content": user_prompt}]
    )

    return message.content[0].text

# Use it
answer = answer_question("How do I reset my password?")
print(answer)
```

## 🎨 Customization Tips

### Adjusting for Your Domain

**1. Add Domain Context to System Prompt:**

```
You are a [DOMAIN] expert assistant. When answering questions about [TOPIC],
prioritize [SPECIFIC GUIDELINES].
```

**2. Customize Output Format:**

```
Format your response for [AUDIENCE]:
- Use [TECHNICAL/SIMPLE] language
- Include [SPECIFIC SECTIONS]
- Highlight [KEY INFORMATION]
```

**3. Add Domain-Specific Rules:**

```
Special considerations:
- [COMPLIANCE REQUIREMENTS]
- [TERMINOLOGY STANDARDS]
- [CITATION FORMAT]
```

### Handling Multiple Languages

```
User queries may be in [LANGUAGE]. Always respond in the same language as
the query. Translate document content as needed for coherent responses.
```

### Adding Citations

```
For each piece of information, include an inline citation:
"The feature supports OAuth 2.0 authentication [Doc 3, Section 2]."
```

## 🧪 Testing Your Prompts

### Test Cases to Try

1. **Clear, answerable question**
   - Expected: Accurate answer with sources

2. **Question with no answer in context**
   - Expected: "I cannot find this information..."

3. **Ambiguous question**
   - Expected: Request for clarification

4. **Question requiring multiple documents**
   - Expected: Synthesized answer from multiple sources

5. **Contradictory information in documents**
   - Expected: Acknowledge discrepancy

### Evaluation Metrics

- **Accuracy:** Is the answer correct?
- **Completeness:** Does it answer the full question?
- **Groundedness:** Is it based only on provided context?
- **Citation Quality:** Are sources properly attributed?
- **Format Adherence:** Does it follow output rules?

## 📚 Next Steps

1. **Explore More Prompts:** Check out other categories
2. **Join Community:** Star the repo, open discussions
3. **Share Feedback:** Let us know what works (or doesn't)
4. **Contribute:** Improve prompts or add new ones

## 🆘 Common Issues

### "The AI ignores my instructions"

- Make instructions more explicit
- Add examples in the prompt
- Use stronger language: "You MUST..." vs "You should..."
- Test with different models

### "Answers are too verbose"

- Add word/sentence limits to Output Rules
- Use "Be concise" in system instructions
- Show example of desired length

### "AI makes up information"

- Strengthen grounding instructions
- Add explicit penalty for hallucination
- Request source citations for every claim
- Use models better at following instructions (Claude, GPT-4)

### "Inconsistent formatting"

- Provide exact format template in prompt
- Use structured output (JSON) if supported
- Show multiple examples of correct format
- Use XML tags for clear structure

## 💡 Pro Tips

1. **Start Simple:** Use templates as-is first, then customize
2. **Test Iteratively:** Make one change at a time
3. **Use Examples:** Few-shot examples improve consistency
4. **Model Matters:** Different models need different prompts
5. **Monitor Production:** Track quality metrics over time

---

**Ready to build?** Pick a [prompt](prompts/) and start coding! 🚀

**Questions?** Open a [discussion](https://github.com/itsumida/rag-prompt-library/discussions).
