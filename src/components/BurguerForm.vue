<template>
  <div>
    <Message :msg="msg" v-show="msg" />
    <div>
      <form id="burger-form" @submit.prevent="createBurguer">
        <div class="input-container">
          <label for="name">Client Name</label>
          <input
            type="text"
            name="name"
            id="nome"
            v-model="name"
            placeholder="Type your name"
          />
        </div>
        <div class="input-container">
          <label for="bread">Select Bread</label>
          <select name="bread" id="pao" v-model="bread">
            <option value="">Select Bread</option>
            <option v-for="bread in breads" :key="bread.id" :value="bread.tipo">
              {{ bread.tipo }}
            </option>
          </select>
        </div>
        <div class="input-container">
          <label for="meat">Select Meat</label>
          <select name="meat" id="carne" v-model="meat">
            <option value="">Select Meat</option>
            <option v-for="meat in meats" :key="meat.id" :value="meat.tipo">
              {{ meat.tipo }}
            </option>
          </select>
        </div>
        <div id="opcionais-container" class="input-container">
          <label id="opcionais-title" for="opcionais">Select Options</label>
          <div
            class="checkbox-container"
            v-for="opcional in opcionaisData"
            :key="opcional.id"
            :value="opcional.tipo"
          >
            <input
              type="checkbox"
              name="opcionais"
              id="opcionais"
              v-model="opcionais"
              :value="opcional.tipo"
            />
            <span>{{ opcional.tipo }}</span>
          </div>
        </div>
        <div class="input-container">
          <input type="submit" class="submit-btn" value="Make My Burguer" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Message from "./Message.vue";
export default {
  data() {
    return {
      // Backend
      breads: null,
      meats: null,
      opcionaisData: null,
      // Frontend
      name: null,
      bread: "",
      meat: "",
      opcionais: [],
      status: "Solicitado",
      msg: null,
    };
  },
  methods: {
    async getIngredients() {
      const req = await fetch("http://localhost:3000/ingredientes");
      const { paes, carnes, opcionais } = await req.json();
      this.breads = paes;
      this.meats = carnes;
      this.opcionaisData = opcionais;
    },
    async createBurguer() {
      const data = {
        nome: this.name,
        carne: this.meat,
        pao: this.bread,
        opcionais: Array.from(this.opcionais),
        status: "Solicitado",
      };
      const dataJson = JSON.stringify(data);
      const req = await fetch("http://localhost:3000/burgers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });
      const res = await req.json();
      // Mensagem de sistema
      // Criar Msg
      // Limpar Msg
      // Limpar os campos
      this.name = "";
      this.meat = "";
      this.bread = "";
      this.opcionais = [];

      this.msg = `Pedido #${res.id} Realizado Com Sucesso`;
      setTimeout(() => {
        this.msg = null;
      }, 3000);
    },
  },
  mounted() {
    this.getIngredients();
  },
  components: { Message },
};
</script>

<style scoped>
#burger-form {
  max-width: 400px;
  margin: 0 auto;
}
.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}
input,
select {
  padding: 5px 10px;
  width: 300px;
}
#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}
#opcionais-title {
  width: 100%;
}
.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}
.checkbox-container span,
.checkbox-container input {
  width: auto;
}
.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}
.submit-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}
.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
