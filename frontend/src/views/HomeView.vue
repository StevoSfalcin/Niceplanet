<template>
  <div class="item-list">
    <div class="header">
      <img alt="Vue logo" class="logo me-3" src="@/assets/logoCompleta.png"  />
      <div class="search-form">
        <input v-model="codigoCar" class="form-control" placeholder="Insira o Código CAR">
        <button class="btn btn-primary" @click="carregarPropriedades">Pesquisar</button>
      </div>
    </div>
    <div class="container text-center">
      <div class="d-flex justify-content-around">
        <div></div>
        <h1 class="my-4 fs-4 text-white">Lista de Propriedades</h1>
        <button @click="$router.push('/analiseAutomatica')" class="btn btn-success  btn-sm">Ver analises Automatica</button>
      </div>
      <table class="table table-striped">
        <thead class="table-light">
          <tr>
            <th scope="col">Nome da Propriedade</th>
            <th scope="col">Numero Car</th>
            <th scope="col">Município</th>
            <th scope="col">Estado</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(propriedade, index) in propriedades" :key="index">
            <td class="text-break">{{ propriedade.nomePropriedade }}</td>
            <td class="text-break">{{ propriedade.numeroCar }}</td>
            <td>{{ propriedade.municipio }}</td>
            <td>{{ propriedade.uf }}</td>
            <td>
              <button type="button" @click="exibirDetalhes(propriedade)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Detalhes
              </button>
            </td>
          </tr>
          <tr v-if="propriedades.length === 0 ">
            <td colspan="5"><span>Sem dados no momento.</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h3>Detalhes</h3>
            <span><strong>Nome Propriedade:</strong> {{ detalhesPropriedade.nomePropriedade }}</span><br>
            <span><strong>Numero Car:</strong> {{ detalhesPropriedade.numeroCar }}</span><br>
            <span><strong>Estado:</strong> {{ detalhesPropriedade.uf }}</span><br>
            <span><strong>Município:</strong> {{ detalhesPropriedade.municipio }}</span><br>
            <strong>Estado Monitoramento:</strong>
            <span :class="{
              'text-danger': detalhesPropriedade.liberado === 0,
              'text-success': detalhesPropriedade.liberado === 1,
              'text-warning': detalhesPropriedade.liberado === 2
            }">
              {{ detalhesPropriedade.liberado === 0 ? 'Bloqueado' : detalhesPropriedade.liberado === 1 ? 'Liberado' : detalhesPropriedade.liberado === 2 ? 'Alerta' : 'Desconhecido' }}
            </span><br>
            <span><strong>Produtores:</strong></span>
            <ul>
              <li v-for="produtor in detalhesPropriedade.produtores" :key="produtor.idVinculo">
                <strong>Nome Produtor:</strong> {{ produtor.produtor.nomeProdutor }}<br>
                <strong>Registro Individual:</strong> {{ produtor.produtor.registroIndividual }}<br><br>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      propriedades: [],
      codigoCar: '',
      detalhesPropriedade: {},
    };
  },
  setup() {
    const toast = useToast();
    return { toast }
  },
  methods: {
    carregarPropriedades() {
      axios.get(`http://localhost:3000/propriedades/${this.codigoCar}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(response => {
          if (response.data.error === false) {
            this.propriedades = response.data.propriedades;
            this.toast(response.data.message, 'success');
          } else {
            console.error('Erro ao buscar as propriedades:', response.data.message);
            this.toast(response.data.message, 'warning');
          }
        }).catch(error => {
          console.error('Erro ao buscar as propriedades:', error);
          this.toast(response.data.message, 'warning');
        });
    },
    exibirDetalhes(propriedade) {
      this.detalhesPropriedade = propriedade;
    },
    toast(texto, tipo) {
      this.toast(texto, {
        position: "top-right",
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: false,
        type: tipo,
    });
  }
  },
};
</script>

<style scoped>
.item-list {
  font-family: Arial, sans-serif;
  background-image: url("https://niceplanet.com.br/static/media/depoimentoSatelite.c20a88b2becfa58e97fa.png");
  height: 100vh;
}
.header {
  background-color: #343a40;
  color: white;
  padding: 10px;
  text-align: center;
}
.header img {
  width: 22rem;
}
.search-form {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
.container {
  margin: 0 auto;
  padding: 20px;
}
.container button{
  height: 3rem;
}
</style>
