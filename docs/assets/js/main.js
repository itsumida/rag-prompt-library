// 8 RAG Prompt Variations - All for Q&A, different approaches
const prompts = [
    {
        id: 'basic-rag',
        name: 'Basic RAG',
        description: 'Simple retrieval-augmented generation with source grounding',
        content: `You are an assistant that answers questions using retrieved documents.

CONTEXT:
{{retrieved_documents}}

QUESTION: {{user_question}}

INSTRUCTIONS:
- Answer based only on the provided context
- If the answer is not in the context, say "I don't have enough information"
- Keep answers clear and concise
- Cite which document you used

Answer the question directly and factually.`
    },
    {
        id: 'citation-rag',
        name: 'RAG with Citations',
        description: 'Answer questions with precise source attribution for every claim',
        content: `Answer questions using retrieved documents with rigorous citation.

DOCUMENTS:
{{retrieved_docs}}

QUERY: {{question}}

RULES:
1. Every claim must have a citation [Doc X]
2. If multiple sources support a claim, cite all [Doc 1, Doc 3]
3. If sources conflict, present both views with citations
4. If not in sources: "Not found in provided documents"
5. Quote exact phrases for critical facts

Format:
**Answer:** [2-3 sentence response]
**Evidence:** [Cited claims]
**Confidence:** High/Medium/Low`
    },
    {
        id: 'conversational-rag',
        name: 'Conversational RAG',
        description: 'Multi-turn dialogue maintaining conversation context with retrieval',
        content: `Maintain conversation context while using retrieved documents.

HISTORY:
{{conversation_history}}

RETRIEVED:
{{documents}}

CURRENT: {{user_message}}

PROTOCOL:
- Check if query references conversation history (pronouns, "that", "it")
- Resolve references before using retrieved docs
- Build on previous answers naturally
- Use conversational tone
- Stay grounded in documents

Respond as in natural conversation while citing sources when needed.`
    },
    {
        id: 'multi-doc-rag',
        name: 'Multi-Document RAG',
        description: 'Synthesize information across multiple retrieved sources',
        content: `Combine information from multiple documents into coherent answers.

SOURCES:
<doc id="1">{{content}}</doc>
<doc id="2">{{content}}</doc>
<doc id="3">{{content}}</doc>

QUESTION: {{query}}

SYNTHESIS:
1. Identify relevant information in each document
2. Find patterns and agreements across sources
3. Note any contradictions
4. Weigh source credibility (date, authority)
5. Build unified answer from all sources

Provide comprehensive answer integrating all relevant documents.`
    },
    {
        id: 'structured-rag',
        name: 'Structured Output RAG',
        description: 'RAG with consistent, structured response formatting',
        content: `Answer using retrieved documents with structured output.

CONTEXT: {{documents}}
QUERY: {{question}}

OUTPUT FORMAT:
**Summary:** [One sentence answer]

**Detailed Answer:**
[2-3 paragraphs with full explanation]

**Key Points:**
• [Point 1]
• [Point 2]
• [Point 3]

**Sources Used:** [Doc 1, Doc 2]

**Limitations:** [What's not covered]

Always follow this exact structure.`
    },
    {
        id: 'confidence-rag',
        name: 'RAG with Confidence Scoring',
        description: 'Provide answers with explicit confidence levels and reasoning',
        content: `Answer questions with confidence assessment.

DOCUMENTS: {{retrieved}}
QUESTION: {{query}}

RESPONSE PROTOCOL:
1. Extract answer from documents
2. Assess confidence based on:
   - Source clarity
   - Agreement across sources
   - Completeness of information
   - Recency of data

OUTPUT:
**Answer:** [Direct response]

**Confidence:** [High/Medium/Low]

**Reasoning:**
- Source quality: [Assessment]
- Coverage: [Complete/Partial/Minimal]
- Certainty: [Why this confidence level]

**Caveats:** [Important qualifications]`
    },
    {
        id: 'contextual-rag',
        name: 'Contextual Memory RAG',
        description: 'RAG with rich context tracking across user session',
        content: `Maintain user context, preferences, and session state with retrieval.

SESSION CONTEXT:
- User preferences: {{preferences}}
- Previous queries: {{query_history}}
- Established facts: {{session_facts}}

RETRIEVED: {{documents}}
CURRENT: {{question}}

CONTEXTUAL PROCESSING:
1. Apply known user preferences to answer
2. Reference established session facts
3. Build on previous query context
4. Personalize based on user history
5. Use documents for new information

Provide contextually-aware answers that feel continuous with the session.`
    },
    {
        id: 'chain-of-thought-rag',
        name: 'Chain-of-Thought RAG',
        description: 'Show reasoning process when deriving answers from documents',
        content: `Answer questions while showing reasoning from retrieved documents.

DOCUMENTS: {{retrieved}}
QUESTION: {{query}}

REASONING PROCESS:
1. **Understanding:** [Restate what's being asked]

2. **Document Analysis:** [What I found in each document]
   - Doc 1: [Relevant info]
   - Doc 2: [Relevant info]

3. **Synthesis:** [How I'm connecting the information]

4. **Answer:** [Final response based on reasoning above]

5. **Verification:** [How confident am I and why]

Show your work - explain how you arrived at the answer from the sources.`
    }
];

// Vote management (localStorage)
function getVotes() {
    const stored = localStorage.getItem('rag-votes');
    return stored ? JSON.parse(stored) : {};
}

function saveVotes(votes) {
    localStorage.setItem('rag-votes', JSON.stringify(votes));
}

function getUserVotes() {
    const stored = localStorage.getItem('rag-user-votes');
    return stored ? JSON.parse(stored) : {};
}

function saveUserVotes(userVotes) {
    localStorage.setItem('rag-user-votes', JSON.stringify(userVotes));
}

function getVoteCount(promptId) {
    const votes = getVotes();
    return votes[promptId] || 0;
}

function vote(promptId, value) {
    const votes = getVotes();
    const userVotes = getUserVotes();

    if (userVotes[promptId]) {
        votes[promptId] = (votes[promptId] || 0) - userVotes[promptId];
    }

    if (userVotes[promptId] === value) {
        delete userVotes[promptId];
    } else {
        votes[promptId] = (votes[promptId] || 0) + value;
        userVotes[promptId] = value;
    }

    saveVotes(votes);
    saveUserVotes(userVotes);

    return votes[promptId] || 0;
}

// Copy to clipboard
async function copyToClipboard(text, button) {
    try {
        await navigator.clipboard.writeText(text);
        const originalText = button.textContent;
        button.textContent = 'Copied';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 1500);
    } catch (err) {
        button.textContent = 'Failed';
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 1500);
    }
}

// Render prompt card
function renderPromptCard(prompt) {
    const voteCount = getVoteCount(prompt.id);
    const userVotes = getUserVotes();
    const userVote = userVotes[prompt.id] || 0;

    const card = document.createElement('div');
    card.className = 'prompt-card';
    card.dataset.id = prompt.id;
    card.dataset.votes = voteCount;

    card.innerHTML = `
        <h2 class="prompt-title">${prompt.name}</h2>
        <p class="prompt-description">${prompt.description}</p>
        <div class="prompt-content">${prompt.content}</div>
        <div class="prompt-actions">
            <button class="copy-btn" data-id="${prompt.id}">Copy</button>
            <div class="vote-container">
                <button class="vote-btn upvote-btn ${userVote === 1 ? 'voted-up' : ''}" data-id="${prompt.id}" data-value="1">👍</button>
                <span class="vote-count">${voteCount}</span>
                <button class="vote-btn downvote-btn ${userVote === -1 ? 'voted-down' : ''}" data-id="${prompt.id}" data-value="-1">👎</button>
            </div>
        </div>
    `;

    return card;
}

// Render all prompts sorted by votes
function renderPrompts() {
    const container = document.getElementById('prompts-container');
    container.innerHTML = '';

    const sortedPrompts = [...prompts].sort((a, b) => {
        return getVoteCount(b.id) - getVoteCount(a.id);
    });

    sortedPrompts.forEach(prompt => {
        container.appendChild(renderPromptCard(prompt));
    });

    addEventListeners();
}

// Event listeners
function addEventListeners() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const promptId = e.target.dataset.id;
            const prompt = prompts.find(p => p.id === promptId);
            if (prompt) {
                copyToClipboard(prompt.content, e.target);
            }
        });
    });

    document.querySelectorAll('.vote-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const promptId = e.target.dataset.id;
            const value = parseInt(e.target.dataset.value);
            const newCount = vote(promptId, value);

            const card = e.target.closest('.prompt-card');
            card.dataset.votes = newCount;
            card.querySelector('.vote-count').textContent = newCount;

            const userVotes = getUserVotes();
            const userVote = userVotes[promptId] || 0;

            card.querySelectorAll('.vote-btn').forEach(voteBtn => {
                voteBtn.classList.remove('voted-up', 'voted-down');
            });

            if (userVote === 1) {
                card.querySelector('.upvote-btn').classList.add('voted-up');
            } else if (userVote === -1) {
                card.querySelector('.downvote-btn').classList.add('voted-down');
            }

            renderPrompts();
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPrompts();
});
