<script>
import { goto } from "$app/navigation";

function goToCreate() {
	goto("/create");
}
</script>
  
  <section class="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 flex flex-col items-center justify-center text-center p-6">
    <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
      아이의 성장, <br class="hidden md:block" />
      사랑스럽게 담아보세요
    </h1>
  
    <p class="text-lg md:text-xl text-gray-600 max-w-xl mb-10">
      매주 몇 줄의 글과 사진만으로, <br />
      감동적인 가족 뉴스레터가 완성됩니다.
    </p>
  
    <button
      onclick={goToCreate}
      class="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300"
    >
      뉴스레터 만들기 시작하기
    </button>
  
    <div class="mt-16 w-full max-w-3xl bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-pink-100">
      <p class="text-sm text-gray-500 italic">
        “매주 정리해보니, 아이와의 일상이 더 소중하게 느껴져요.”<br/>
        – 유찬 엄마
      </p>
    </div>
  </section>
