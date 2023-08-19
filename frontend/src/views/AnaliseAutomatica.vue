<template>
  <div class="item-list">
    <div class="header">
      <img alt="Vue logo" class="logo me-3" src="@/assets/logoCompleta.png"  />
      <div class="search-form">
        <input v-model="codigoCar" class="form-control" placeholder="Insira o Código CAR">
        <button class="btn btn-primary" @click="carregarAnalises">Pesquisar</button>
      </div>
    </div>
    <div class="container text-center">
      <div class="d-flex justify-content-between">
        <div></div>
        <h1 class="my-4 fs-4 text-white">Lista de Propriedades</h1>
        <button @click="$router.push('/')" class="btn btn-success  btn-sm">Ver Propriedades</button>
      </div>
      <table class="table table-striped">
        <thead class="table-light">
          <tr>
            <th scope="col">Nome da Propriedades</th>
            <th scope="col">Nome do Produtor</th>
            <th scope="col">CPF do Produtor</th>
            <th scope="col">Município</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(analise, index) in analisesAutomatica" :key="index">
            <td class="text-break">{{ analise.propriedadeNome }}</td>
            <td class="text-break">{{ analise.produtorNome }}</td>
            <td class="text-break">{{ analise.produtorCpf }}</td>
            <td>{{ analise.municipio }}</td>
            <td>
              <button type="button" @click="exibirDetalhes(analise)" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Detalhes
              </button>
              <button type="button" @click="deletarAnalise(analise.id)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Deleter
              </button>
            </td>
          </tr>
          <tr v-if="analisesAutomatica.length === 0 ">
            <td colspan="6"><span>Sem dados no momento.</span></td>
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
            <span><strong>Nome Propriedade:</strong> {{ detalhesAnalise.propriedadeNome }}</span><br>
            <span><strong>Numero Car:</strong> {{ detalhesAnalise.car }}</span><br>
            <span><strong>Estado:</strong> {{ detalhesAnalise.uf }}</span><br>
            <span><strong>Município:</strong> {{ detalhesAnalise.municipio }}</span><br>
            <span><strong>Status:</strong> {{ detalhesAnalise.status }}</span><br>
            <strong>Estado Monitoramento:</strong>
            <span :class="{
              'text-danger': detalhesAnalise.liberado === 0,
              'text-success': detalhesAnalise.liberado === 1,
              'text-warning': detalhesAnalise.liberado === 2
            }">
              {{ detalhesAnalise.liberado === 0 ? 'Bloqueado' : detalhesAnalise.liberado === 1 ? 'Liberado' : detalhesAnalise.liberado === 2 ? 'Alerta' : 'Desconhecido' }}
            </span><br>
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
      analisesAutomatica: [],
      codigoCar: '',
      detalhesAnalise: {},
    };
  },
  setup() {
    const toast = useToast();
    return { toast }
  },
  methods: {
    carregarAnalises() {
      const codigo = this.codigoCar === '' ? 'all' : this.codigoCar;
      axios.get(`http://localhost:3000/analiseAutomaticas/${codigo}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(response => {
          if (response.data.error === false) {
            this.analisesAutomatica = response.data.analisesAutomaticas;
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
    exibirDetalhes(analise) {
      this.detalhesAnalise = analise;
    },
    toast(texto, tipo) {
      this.toast(texto, {
        position: "top-right",
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: false,
        type: tipo,
      });
    },
    deletarAnalise(id) {
      axios.delete(`http://localhost:3000/analiseAutomaticas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(response => {
          if (response.data.error === false) {
            this.$router.go(this.$router.currentRoute)
          } else {
            console.error('Erro ao buscar a analise:', response.data.message);
            this.toast(response.data.message, 'warning');
          }
        }).catch(error => {
          console.error('Erro ao buscar a analise:', error);
          this.toast(response.data.message, 'warning');
        });
    },
  },
  mounted() {
    this.carregarAnalises();
  },
};
</script>

<style scoped>
.item-list {
  font-family: Arial, sans-serif;
  background: linear-gradient(180deg,var(--darkreader-bg--token-ad9fdb65-064f-45e8-a089-1eed7d3c08e0, #195a93) 0%,var(--darkreader-bg--token-bc5bb37b-d676-4e6e-b4fe-299982ce66c3, #08723a) 100%);
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
