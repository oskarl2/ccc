<template>
  <div>
    <rs-button
      size="large"
      @click="shownModal = !shownModal"
      class="active-button"
    >
      {{ 'Открыть форму добавления' }}
    </rs-button>

    <rs-modal
      :value="shownModal"
      @changeShown="changeVisible"
    >
      <template slot="header">
        <div class="workers-modal-header">
          {{ 'Добавление пользователя' }}
        </div>
      </template>

      <div class="workers-modal-body">
        <div class="workers-modal-form">
          <div class="form-elements">
            <rs-field
              label-position="left"
              class="field-horizontal"
              :label="'Имя'"
            >
              <rs-input
                size="medium"
                v-model="newWorkers.name"
                :placeholder="'Введите Имя'"
                :error="nameError"
              />
            </rs-field>
          </div>

          <div class="form-elements">
            <rs-field
              label-position="left"
              class="field-horizontal"
              :label="'Телефон'"
            >
              <rs-input
                size="medium"
                v-model="newWorkers.phone"
                :placeholder="'+79991112233'"
                :error="phoneError"
              />
            </rs-field>
          </div>

          <div class="form-elements">
            <rs-field
              label-position="left"
              class="field-horizontal"
              :label="'Начальник'"
            >
              <rs-select
                v-model="workerValue"
                :width="200"
                :placeholder="'Выберите пользователя'"
              >
                <template v-if="workersList.length > 0">
                  <rs-select-option
                    v-for=" worker  in workersList"
                    :key="worker.id"
                    :value="worker.id"
                  >
                    {{ worker.name }}
                  </rs-select-option>
                </template>
              </rs-select>
            </rs-field>
          </div>

          <template  v-if="requiredFieldsError">
             <span class="form-error">
               {{ 'Поля заполнены не корректно' }}
              </span>
          </template>

          <rs-button
              size="large"
              :loading="isRequestAddUserInProgress"
              @click="validateForm"
          >
            {{ 'Сохранить' }}
          </rs-button>
        </div>
      </div>
    </rs-modal>
  </div>
</template>

<script>
import { saveWorkers } from '../dataLayer';
import { PHONE_REGEXP, NAME_REGEXP } from './helpers';

export default {
  props: {
    workersList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      newWorkers: {
        name: '',
        phone: ''
      },
      workerValue: '',
      shownModal: false,
      nameError: false,
      phoneError: false,
      isHasWorkers: true,
      requiredFieldsError: false,
      isRequestAddUserInProgress: false
    };
  },
  methods: {
    async addUser() {
      let workersList = this.workersList;
      const workerValue = this.workerValue;
      const formUser = {
        name: this.newWorkers.name,
        phone: this.newWorkers.phone,
        isShow: false,
        children: []
      };

      workersList.push(formUser);
      workersList.forEach(function (worker, idx) {
        worker.id = idx;
      });

      if (workerValue !== undefined) {
        workersList.forEach(worker => {
          if (worker.id === workerValue) {
            workersList[workerValue].children.push(formUser);
          }
        });
      }

      await saveWorkers(workersList);
      this.changeVisible(false);
    },
    changeVisible(changeShown) {
      this.shownModal = changeShown;
      this.newWorkers.phone = '';
      this.newWorkers.name = '';
      this.workerValue = ''
    },
    validateForm() {
      this.phoneError = false;
      this.nameError = false;
      this.requiredFieldsError = false;

      const newWorkersPhone = this.newWorkers.phone;
      const newWorkersName = this.newWorkers.name;

      const isValidPhone = PHONE_REGEXP.test(newWorkersPhone);
      const isValidName = NAME_REGEXP.test(newWorkersName);

      if (newWorkersPhone.length === 0 || !isValidPhone) {
        this.phoneError = true;
        this.requiredFieldsError = true;
      }

      if(newWorkersName.length === 0 || !isValidName) {
        this.nameError = true;
        this.requiredFieldsError = true;
      }

      if(!this.requiredFieldsError) {
        this.addUser();
      }
    }
  }
}
</script>

<style lang="less" scoped >
  .form-elements {
    margin-bottom: 20px;
  }
  .form-error {
    display: flex;
    margin-bottom: 5px;
  }
  .active-button {
    margin-bottom: 20px;
  }
</style>