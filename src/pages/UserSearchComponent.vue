<template>
  <b-container class="bv-example-row">
    <p>
      <b-form-input v-model="question"
        type="text"
        placeholder="Имя или email польователя"
      ></b-form-input>
    </p>
    <p>{{ answer }}</p>
    <b-row>
      <b-col v-for="user in users" :key="user.id" cols="4">
        <b-card :title="user.name"
          :img-src="user.picture.large"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-button size="sm" :href="`#/user/info/${user.id}`" variant="primary">Profile view</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
  .card {
    line-height: unset;
  }
</style>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      question: '',
      answer: '',
      users: []
    }
  },
  watch: {
    // эта функция запускается при любом изменении вопроса
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Ожидаю, когда вы закончите печатать...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // _.debounce — это функция из lodash, позволяющая ограничить
    // то, насколько часто может выполняться определённая операция.
    // В данном случае мы хотим ограничить частоту обращений к yesno.wtf/api,
    // дожидаясь завершения печати вопроса перед тем как послать ajax-запрос.
    // Чтобы узнать больше о функции _.debounce (и её родственнице _.throttle),
    // см. документацию: https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.length < 3) {
        this.answer = 'Введите больше 3х символов'
        return
      }
      this.answer = 'Поиск...'
      var options = {
        params: {
          search: this.question
        }
        
      }
      axios.get('/users/search', options)
        .then((response) => {
          this.answer = 'Нашел'
          this.users = response.data.data
          console.log(this.users)

        }).catch((error) => {
          this.users = []
          if (400 == error.response.status) {
            return this.answer = 'Доступно только авторизованным пользователям'
          }
          this.answer = error.response.data.errors[0]
        })
    }
  }
  
}
</script>
