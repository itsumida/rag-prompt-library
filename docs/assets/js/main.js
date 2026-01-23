// 10 Research-Backed RAG Prompt Templates
// Based on best practices from Scoutos, OpenAI community, and RAG implementation guides
const prompts = [
    {
        id: 'grounded-basic-rag',
        name: 'Grounded Basic RAG',
        description: 'Foundation pattern with positive framing and explicit grounding',
        content: `CONTEXT:
{retrieved_documents}

QUESTION:
{user_question}

INSTRUCTIONS:
Answer the QUESTION using only the information provided in the CONTEXT above.
Keep your answer grounded in the facts of the CONTEXT.
Use [chunk_id] notation immediately after each statement to cite sources.
If the CONTEXT doesn't contain enough information to fully answer the QUESTION, state: "I don't have enough information to answer this completely" and explain what's missing.
Match the language of the user's QUESTION in your response.

Provide a clear, factual answer based solely on the CONTEXT provided.`
    },
    {
        id: 'chain-of-thought-rag',
        name: 'Chain-of-Thought RAG',
        description: 'Multi-step reasoning with transparent intermediate steps',
        content: `You will answer questions using retrieved context through explicit reasoning steps.

CONTEXT:
{retrieved_documents}

QUESTION:
{user_question}

PROCESS:
1. **Understand:** Restate the core question in simple terms
2. **Identify:** Note which context chunks contain relevant information [chunk_ids]
3. **Reason:** Explain how the context answers the question, step by step
4. **Synthesize:** Provide the final answer with citations [chunk_id]

FORMAT YOUR RESPONSE:
**Understanding:** [Restated question]
**Relevant Context:** [List applicable chunks]
**Reasoning:** [Step-by-step explanation]
**Answer:** [Final response with citations]

If context is insufficient, explain what specific information is missing.`
    },
    {
        id: 'query-condensation-rag',
        name: 'Query Condensation RAG',
        description: 'Simplify complex queries before answering for better accuracy',
        content: `You will handle complex questions by first condensing them to core meaning.

STEP 1 - CONDENSE THE QUERY:
Original question: {user_question}
Core meaning: [Rewrite the question in its simplest, most direct form]

STEP 2 - USE CONTEXT:
{retrieved_documents}

STEP 3 - ANSWER:
Using the condensed query and the context above:
- Answer the core question directly
- Cite every fact with [chunk_id]
- If context doesn't address the condensed query: "The provided context doesn't contain information about [core topic]"

This approach ensures you understand the question's essence before attempting to answer.`
    },
    {
        id: 'self-critique-rag',
        name: 'Self-Critique RAG',
        description: 'Draft, review against sources, then refine for accuracy',
        content: `Answer questions through a self-review process to ensure accuracy.

CONTEXT:
{retrieved_documents}

QUESTION:
{user_question}

PROCESS:

**DRAFT ANSWER:**
[Write initial response based on context, with citations [chunk_id]]

**SELF-REVIEW:**
- Does every claim have a citation? [Yes/No]
- Did I add any information not in the context? [Yes/No]
- Are there contradictions between my answer and the sources? [Yes/No]
- What could be more accurate? [List improvements]

**FINAL ANSWER:**
[Refined response incorporating review feedback, with complete citations]

**SOURCES USED:**
[List chunk_ids with brief description of what each contributed]

This ensures accuracy through deliberate verification.`
    },
    {
        id: 'structured-rag',
        name: 'Structured RAG',
        description: 'Consistent formatting for reliable parsing and integration',
        content: `Provide answers in consistent structured format for easy parsing.

CONTEXT:
{retrieved_documents}

QUESTION:
{user_question}

RESPONSE STRUCTURE:

**ANSWER:**
[One clear sentence directly answering the question with citation[chunk_id]]

**SUPPORTING DETAILS:**
• [Key point 1 with citation[chunk_id]]
• [Key point 2 with citation[chunk_id]]
• [Key point 3 with citation[chunk_id]]

**CONFIDENCE:**
[HIGH/MEDIUM/LOW] - [Brief explanation]

**LIMITATIONS:**
[What the context doesn't cover about this question]

If unable to answer:
**ANSWER:** Insufficient information
**REASON:** [Specific explanation of what's missing]

Always use this exact structure.`
    },
    {
        id: 'multi-document-synthesis-rag',
        name: 'Multi-Document Synthesis RAG',
        description: 'Cross-reference multiple sources with agreement/conflict tracking',
        content: `Synthesize information from multiple retrieved documents, tracking agreements and conflicts.

CONTEXT CHUNKS:
{retrieved_documents}

QUESTION:
{user_question}

SYNTHESIS INSTRUCTIONS:
1. Identify ALL chunks containing relevant information
2. Look for agreements: "Multiple sources confirm [fact][1,3,5]"
3. Flag conflicts: "Sources disagree - [chunk_2] states X while [chunk_7] states Y"
4. Build comprehensive answer from all available evidence
5. Cite every claim with [chunk_id] or [chunk_id1,chunk_id2] for multiple sources

RESPONSE FORMAT:
[Synthesized answer integrating all relevant sources with citations]

**CONSENSUS:** [Points confirmed by multiple sources]
**CONFLICTS:** [Any contradictions found, if applicable]
**GAPS:** [Information not covered by any source]

Provide a unified view of what the sources collectively say.`
    },
    {
        id: 'conversational-memory-rag',
        name: 'Conversational Memory RAG',
        description: 'Natural dialogue with conversation history awareness',
        content: `You are a conversational assistant that maintains context across turns while grounding responses in retrieved information.

CONVERSATION HISTORY:
{conversation_history}

RETRIEVED CONTEXT:
{retrieved_documents}

CURRENT QUESTION:
{user_question}

INSTRUCTIONS:
- Use natural, friendly language
- Reference previous conversation turns when relevant
- Ground all factual claims in RETRIEVED CONTEXT with citations [chunk_id]
- If the user is following up on a previous topic, acknowledge the continuity
- If RETRIEVED CONTEXT doesn't contain needed information: "I don't see information about that in the current results"
- Maintain conversational flow while staying factually grounded

Balance natural dialogue with rigorous source attribution.`
    },
    {
        id: 'query-expansion-rag',
        name: 'Query Expansion RAG',
        description: 'Expand queries with synonyms and related terms for better retrieval',
        content: `Handle queries by first expanding them to capture alternative phrasings and related concepts.

ORIGINAL QUERY:
{user_question}

STEP 1 - EXPAND QUERY:
Generate 3 variations of this query using:
- Synonyms for key terms
- Related technical terms
- Alternative phrasings
[List expanded queries]

STEP 2 - CONTEXT:
{retrieved_documents}

STEP 3 - ANSWER:
Using the expanded understanding and retrieved context:
- Answer the original query comprehensively
- Cite all sources [chunk_id]
- Cover aspects that alternative phrasings might have addressed
- If context is insufficient despite expansion: "Even considering related terms like [X, Y, Z], the context doesn't provide information about [topic]"

Query expansion ensures comprehensive retrieval before answering.`
    },
    {
        id: 'fallback-aware-rag',
        name: 'Fallback-Aware RAG',
        description: 'Graceful handling of missing information with partial answers',
        content: `Provide answers when possible, gracefully handle gaps when information is missing.

CONTEXT:
{retrieved_documents}

QUESTION:
{user_question}

ASSESSMENT:
First, determine: Can this question be answered with the provided context?
- Fully answerable: Provide complete answer with citations
- Partially answerable: Answer what you can, explicitly note gaps
- Not answerable: Clearly state what information is missing

RESPONSE:

[If fully/partially answerable:]
[Answer based on available context with citations [chunk_id]]

**WHAT I CAN CONFIRM:** [Facts supported by context]
**WHAT I CANNOT CONFIRM:** [Aspects not covered by context]

[If not answerable:]
"I cannot answer this question because the provided context does not contain information about [specific missing elements]."

Be transparent about knowledge boundaries while maximizing helpfulness.`
    },
    {
        id: 'cite-and-quote-rag',
        name: 'Cite & Quote RAG',
        description: 'Balance paraphrasing with direct quotes for credibility',
        content: `Provide answers that balance your paraphrasing with direct quotations from sources.

CONTEXT:
{retrieved_documents}

QUESTION:
{user_question}

ANSWERING APPROACH:
- Start with a direct answer citing the source [chunk_id]
- Support with a relevant direct quote: "exact text from source"[chunk_id]
- Paraphrase additional supporting details with citations
- Use quotes for: key definitions, specific numbers/dates, policy statements
- Use paraphrasing for: general concepts, synthesized information

RESPONSE FORMAT:
[Opening statement with citation[chunk_id]]

According to the source: "[relevant direct quote]"[chunk_id]

[Additional paraphrased context with citations]

Balance quotations with synthesis to provide both accuracy and readability.`
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
                <button class="vote-btn upvote-btn ${userVote === 1 ? 'voted-up' : ''}" data-id="${prompt.id}" data-value="1">▲</button>
                <span class="vote-count">${voteCount}</span>
                <button class="vote-btn downvote-btn ${userVote === -1 ? 'voted-down' : ''}" data-id="${prompt.id}" data-value="-1">▼</button>
            </div>
        </div>
    `;

    return card;
}

// Current sort mode
let currentSort = 'default'; // 'default' or 'votes'

// Render all prompts
function renderPrompts(sortMode = currentSort) {
    const container = document.getElementById('prompts-container');
    container.innerHTML = '';

    let displayPrompts = [...prompts];

    if (sortMode === 'votes') {
        displayPrompts.sort((a, b) => {
            return getVoteCount(b.id) - getVoteCount(a.id);
        });
    }
    // else keep default order

    displayPrompts.forEach(prompt => {
        container.appendChild(renderPromptCard(prompt));
    });

    addEventListeners();
    updateSortButtons(sortMode);
}

// Update sort button states
function updateSortButtons(sortMode) {
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    if (sortMode === 'votes') {
        document.getElementById('sort-by-votes').classList.add('active');
    } else {
        document.getElementById('sort-default').classList.add('active');
    }
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

            // Don't re-render/re-sort automatically - let user control sorting
        });
    });
}

// Sort button handlers
function addSortListeners() {
    document.getElementById('sort-by-votes').addEventListener('click', () => {
        currentSort = 'votes';
        renderPrompts('votes');
    });

    document.getElementById('sort-default').addEventListener('click', () => {
        currentSort = 'default';
        renderPrompts('default');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    addSortListeners();
    renderPrompts('default');
});
