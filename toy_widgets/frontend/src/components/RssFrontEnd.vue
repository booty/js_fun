<template>
  <div class="widget">
    <h3>News Reader</h3>
    <select v-model="selectedFeed" @change="fetchHeadlines">
      <option v-for="(feed, index) in feeds" :key="index" :value="feed.url">{{ feed.name }}</option>
    </select>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <ul v-else>
      <li v-for="(headline, index) in headlines" :key="index">
        <a :href="headline.link" target="_blank">{{ headline.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const feeds = ref([
      { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml' },
      { name: 'NPR', url: 'https://www.npr.org/rss/rss.php?id=1001' },
      {
        name: 'The Guardian',
        url: 'https://www.theguardian.com/world/rss'
      }
    ])
    const selectedFeed = ref(feeds.value[0].url)
    const headlines = ref([])
    const errorMessage = ref('')

    const fetchHeadlines = async () => {
      try {
        const response = await axios.get('http://localhost:8000/headlines', {
          params: { url: selectedFeed.value }
        })
        // const response = await axios.get(selectedFeed.value, { crossDomain: true, jsonp: false })
        headlines.value = response.data.headlines
        errorMessage.value = ''
      } catch (error) {
        headlines.value = []
        errorMessage.value = error.message
      }
    }

    onMounted(() => {
      fetchHeadlines()
    })

    return {
      feeds,
      selectedFeed,
      headlines,
      errorMessage,
      fetchHeadlines
    }
  },
  watch: {
    selectedFeed: function () {
      this.fetchHeadlines()
    }
  }
}
</script>
