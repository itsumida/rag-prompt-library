// 9 Research-Backed RAG Prompt Templates
// Based on best practices from Scoutos, OpenAI community, and RAG implementation guides
const prompts = [
    {
        id: 'grounded-basic-rag',
        name: 'Grounded Basic RAG',
        description: 'Context-only answers. Every claim must be cited',
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
        id: 'strict-citation-rag',
        name: 'Strict Citation RAG',
        description: 'Strict grounding. No inference or external knowledge',
        content: `You are an AI assistant. Provide accurate responses based STRICTLY on the provided search results.

CONTEXT:
{retrieved_documents}

QUESTION:
{user_question}

STRICT GUIDELINES:
1. ONLY answer using information explicitly found in the CONTEXT
2. Citations are MANDATORY for every factual statement: [chunk_id]
3. If CONTEXT doesn't contain information to fully answer, state: "I cannot fully answer this question based on the available information" and explain what's missing
4. Do not infer, assume, or add external knowledge
5. Match the language of the user's QUESTION
6. Include relevant direct quotes from CONTEXT with citations
7. Do not preface with "based on the context" - simply provide cited answer

If CONTEXT is irrelevant or insufficient: "I cannot answer this question as the provided context does not contain relevant information about [specific topic]."`
    },
    {
        id: 'concise-grounded-rag',
        name: 'Concise Grounded RAG',
        description: 'Short, direct answers with citations',
        content: `CONTEXT:
{retrieved_documents}

QUESTION:
{user_question}

INSTRUCTIONS:
Provide a brief, direct answer from the CONTEXT above.
- Answer in 1-3 sentences maximum
- Cite key facts with [chunk_id]
- Skip elaboration unless essential
- If no information available: "Not found in context"
- Match user's language
- Get straight to the point

Example format: "The deadline is March 15[2]. Extensions require approval[2]."

Prioritize brevity and clarity over comprehensive detail.`
    },
    {
        id: 'verbose-grounded-rag',
        name: 'Verbose Grounded RAG',
        description: 'Complete extraction from sources, fully cited',
        content: `CONTEXT:
{retrieved_documents}

QUESTION:
{user_question}

INSTRUCTIONS:
Provide thorough, detailed answers from the CONTEXT above with comprehensive citations.

APPROACH:
1. Extract ALL relevant information from CONTEXT
2. Cite every claim with [chunk_id] notation
3. Include supporting details and context
4. Provide multiple perspectives if present
5. Quote extensively with citations
6. Explain nuances and qualifications
7. If information is incomplete, detail exactly what's missing

FORMAT:
**Main Answer:** [Detailed response with citations]
**Additional Context:** [Supporting information]
**Limitations:** [What CONTEXT doesn't cover]

Err on the side of providing more information rather than less, while maintaining strict grounding.`
    },
    {
        id: 'chain-of-thought-rag',
        name: 'Chain-of-Thought RAG',
        description: 'Reasoning steps made explicit',
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
        id: 'self-critique-rag',
        name: 'Self-Critique RAG',
        description: 'Self-checked for unsupported claims',
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
        description: 'Consistent, structured output',
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
        id: 'structured-critique-rag',
        name: 'Structured Self-Critique RAG',
        description: 'Structured output with built-in verification',
        content: `Answer questions using a structured format with built-in self-critique.

CONTEXT:
{retrieved_documents}

QUESTION:
{user_question}

PROCESS:

**DRAFT ANSWER:**
[Initial response based on CONTEXT with citations [chunk_id]]

**SELF-REVIEW CHECKLIST:**
- [ ] Every claim has a citation
- [ ] No information added beyond CONTEXT
- [ ] No contradictions with sources
- [ ] Language matches user's QUESTION

**FINAL STRUCTURED ANSWER:**

**Direct Answer:** [One sentence with citation[chunk_id]]

**Details:**
• [Point 1 with citation[chunk_id]]
• [Point 2 with citation[chunk_id]]
• [Point 3 with citation[chunk_id]]

**Confidence:** [HIGH/MEDIUM/LOW based on source clarity]

**Gaps:** [What CONTEXT doesn't address]

This combines accuracy verification with consistent formatting.`
    },
    {
        id: 'balanced-grounded-rag',
        name: 'Balanced Grounded RAG',
        description: 'Grounded, readable, and practical',
        content: `Answer questions with balanced rigor and helpfulness while staying grounded in context.

CONTEXT:
{retrieved_documents}

QUESTION:
{user_question}

GUIDELINES:
1. Base all answers on CONTEXT with [chunk_id] citations
2. If information is partial, answer what you can and note gaps clearly
3. Use clear, conversational language while maintaining accuracy
4. Cite sources naturally: "The policy states X[2]"
5. If completely unable to answer: "The context doesn't address this question"
6. Provide helpful context from available information
7. Match the user's language and tone

APPROACH:
Strike a balance between strict accuracy and user helpfulness. Be as useful as possible within the constraints of available information, while never inventing or assuming facts not present in CONTEXT.

Prioritize both precision and practicality.`
    },
];

// Vote management (Supabase)
// Get or create user ID (stored in localStorage for user identity)
function getUserId() {
    let userId = localStorage.getItem('rag-user-id');
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        localStorage.setItem('rag-user-id', userId);
    }
    return userId;
}

// Get vote count for a prompt
async function getVoteCount(promptId) {
    try {
        if (!supabaseClient) {
            console.error('Supabase client not initialized');
            return 0;
        }

        const { data, error } = await supabaseClient
            .from('votes')
            .select('vote')
            .eq('prompt_id', promptId);

        if (error) {
            console.error('Error fetching votes:', error);
            return 0;
        }

        return data.reduce((sum, record) => sum + record.vote, 0);
    } catch (err) {
        console.error('Error in getVoteCount:', err);
        return 0;
    }
}

// Get user's vote for a prompt
async function getUserVote(promptId) {
    try {
        if (!supabaseClient) {
            console.error('Supabase client not initialized');
            return 0;
        }

        const userId = getUserId();
        const { data, error } = await supabaseClient
            .from('votes')
            .select('vote')
            .eq('prompt_id', promptId)
            .eq('user_id', userId)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned, which is OK
            console.error('Error fetching user vote:', error);
        }

        return data ? data.vote : 0;
    } catch (err) {
        console.error('Error in getUserVote:', err);
        return 0;
    }
}

// Vote on a prompt
async function vote(promptId, value) {
    try {
        if (!supabaseClient) {
            console.error('Supabase client not initialized');
            return 0;
        }

        const userId = getUserId();

        // Check if user already voted
        const { data: existingVote, error: fetchError } = await supabaseClient
            .from('votes')
            .select('*')
            .eq('prompt_id', promptId)
            .eq('user_id', userId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Error checking existing vote:', fetchError);
        }

        if (existingVote) {
            // If clicking the same button, remove vote (toggle off)
            if (existingVote.vote === value) {
                const { error: deleteError } = await supabaseClient
                    .from('votes')
                    .delete()
                    .eq('prompt_id', promptId)
                    .eq('user_id', userId);

                if (deleteError) console.error('Error deleting vote:', deleteError);
            }
            // If clicking opposite button, neutralize (remove vote)
            else {
                const { error: deleteError } = await supabaseClient
                    .from('votes')
                    .delete()
                    .eq('prompt_id', promptId)
                    .eq('user_id', userId);

                if (deleteError) console.error('Error deleting vote:', deleteError);
            }
        }
        // No previous vote, add new vote
        else {
            const { error: insertError } = await supabaseClient
                .from('votes')
                .insert([
                    { prompt_id: promptId, user_id: userId, vote: value }
                ]);

            if (insertError) console.error('Error inserting vote:', insertError);
        }

        // Return new vote count
        return await getVoteCount(promptId);
    } catch (err) {
        console.error('Error in vote function:', err);
        return 0;
    }
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
async function renderPromptCard(prompt) {
    let voteCount = 0;
    let userVote = 0;

    try {
        voteCount = await getVoteCount(prompt.id);
        userVote = await getUserVote(prompt.id);
    } catch (err) {
        console.error('Error loading vote data for prompt:', prompt.id, err);
    }

    const card = document.createElement('div');
    card.className = 'prompt-card';
    card.dataset.id = prompt.id;
    card.dataset.votes = voteCount;

    card.innerHTML = `
        <p class="prompt-description">${prompt.description}</p>
        <div class="prompt-content">${prompt.content}</div>
        <div class="prompt-actions">
            <button class="copy-btn" data-id="${prompt.id}">Copy</button>
            <div class="vote-container">
                <button class="vote-btn upvote-btn ${userVote === 1 ? 'voted-up' : ''}" data-id="${prompt.id}" data-value="1">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path d="M12 4l8 8H4z" fill="currentColor"/>
                    </svg>
                </button>
                <span class="vote-count">${voteCount}</span>
                <button class="vote-btn downvote-btn ${userVote === -1 ? 'voted-down' : ''}" data-id="${prompt.id}" data-value="-1">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path d="M12 20l-8-8h16z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
    `;

    return card;
}

// Render all prompts
async function renderPrompts() {
    const container = document.getElementById('prompts-container');
    container.innerHTML = '';

    try {
        for (const prompt of prompts) {
            const card = await renderPromptCard(prompt);
            container.appendChild(card);
        }

        addEventListeners();
    } catch (err) {
        console.error('Error rendering prompts:', err);
        container.innerHTML = '<p style="padding: 20px; text-align: center; color: #666;">Error loading prompts. Please refresh the page.</p>';
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
        btn.addEventListener('click', async (e) => {
            // Use currentTarget to get the button, not the clicked SVG element
            const button = e.currentTarget;
            const promptId = button.dataset.id;
            const value = parseInt(button.dataset.value);

            // Disable button during request
            button.disabled = true;

            const newCount = await vote(promptId, value);
            const userVote = await getUserVote(promptId);

            const card = button.closest('.prompt-card');
            card.dataset.votes = newCount;
            card.querySelector('.vote-count').textContent = newCount;

            card.querySelectorAll('.vote-btn').forEach(voteBtn => {
                voteBtn.classList.remove('voted-up', 'voted-down');
                voteBtn.disabled = false;
            });

            if (userVote === 1) {
                card.querySelector('.upvote-btn').classList.add('voted-up');
            } else if (userVote === -1) {
                card.querySelector('.downvote-btn').classList.add('voted-down');
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPrompts();
});
