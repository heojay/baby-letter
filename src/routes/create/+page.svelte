<script lang="ts">
  const questions = [
    '이번 주 아이가 새롭게 보여준 행동이나 변화가 있었나요?',
    '아이와 함께한 일상 중, 가장 행복했던 순간은 언제였나요?',
    '이번 주 아이를 보며 어떤 감정을 느꼈나요?'
  ];

  let answers = $state(['', '', '']);
  let errorMessage = $state('');
  let isLoading = $state(false);
  let newsletter = $state('');

  async function handleSubmit() {
    try {
      isLoading = true;

      // 답변들을 하나의 문장으로 이어붙임
      const formattedInput = questions.map((q, i) => `[질문 ${i + 1}]\n${q}\n\n[답변 ${i + 1}]\n${answers[i]}`).join('\n\n');

      const response = await fetch('/api/generate-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weeklyNote: formattedInput })
      });

      if (!response.ok) throw new Error('뉴스레터 생성에 실패했습니다.');
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      if (data.newsletter) {
        newsletter = data.newsletter;
      } else {
        throw new Error('뉴스레터 생성에 실패했습니다.');
      }

    } catch (error) {
      errorMessage = error instanceof Error ? error.message : '오류가 발생했습니다.';
    } finally {
      isLoading = false;
    }
  }
</script>

<h1 class="text-3xl font-bold text-center mt-8">주간 뉴스레터 생성</h1>

{#if newsletter}
  <div class="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-semibold mb-4">생성된 뉴스레터</h2>
    <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
      {@html newsletter}
    </div>
    <button
      class="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onclick={() => (newsletter = '')}
    >
      다시 작성하기
    </button>
  </div>
{:else}
  <form onsubmit={handleSubmit} class="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg space-y-6">
    {#each questions as question, i}
      <div>
        <h2 class="text-lg font-semibold mb-2">{question}</h2>
        <textarea
          bind:value={answers[i]}
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="여기에 답변을 입력하세요..."
          rows="3"
          disabled={isLoading}
        ></textarea>
      </div>
    {/each}

    {#if errorMessage}
      <p class="text-red-500 text-sm">{errorMessage}</p>
    {/if}

    <button
      type="submit"
      class="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      disabled={isLoading}
    >
      {#if isLoading}
        생성 중...
      {:else}
        뉴스레터 생성
      {/if}
    </button>
  </form>
{/if}
