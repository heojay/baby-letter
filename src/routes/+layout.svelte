<script>
  let { children } = $props();
  import "../app.css";
</script>

<main>
  <header>
    <h1 class="text-3xl font-bold">
      <a href="/" style="text-decoration: none; color: inherit;">Baby Newsletter</a>
    </h1>
  </header>
  {@render children()}
</main>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f8f9fa;
  }
</style>
