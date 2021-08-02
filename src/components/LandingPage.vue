<template>
  <div class="landingpage">
    <div class="clearfix">
      <div class="left">Welcome {{ userKey }}!!!</div>
      <a-button v-if="userRole === 'BUYER'" class="right" @click="newLoan">{{
        buttonName
      }}</a-button>
    </div>
    <a-table
      :columns="columns"
      :data-source="userLoans"
      bordered
      class="my-table"
    >
      <template slot="payment" slot-scope="text, record">
        <span v-if="record.loanDue === 'Next Week'"
          >Payment to be collected later</span
        >
        <div v-if="record.loanDue === 'Pending Admin Approval'">
          <div v-if="userRole === 'ADMIN'">
            <a-button class="pay-btn" @click="() => approveLoan(record.loanId)"
              >Approve</a-button
            >
          </div>
          <span v-else>Yet to Process</span>
        </div>
        <a-button
          class="pay-btn"
          v-if="record.loanDue === 'This Week'"
          @click="() => payNow(record.key)"
          >Pay Now</a-button
        >
      </template>
    </a-table>
    <a-modal
      :visible="newLoanModal"
      centered
      title="Application"
      @ok="() => handleSubmit()"
      @cancel="() => newLoan()"
    >
      <a-form :form="newLoanForm" @submit="handleSubmit">
        <a-form-item>
          <a-input
            v-decorator="[
              'newLoanDetails.loanAmount',
              {
                rules: [{ required: true, message: 'Enter loan amount' }],
              },
            ]"
            type="number"
            placeholder="Loan Amount"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'newLoanDetails.loanYears',
              {
                rules: [{ required: true, message: 'Enter Tenure' }],
              },
            ]"
            type="number"
            placeholder="Tenure in Years"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
const columns = [
  {
    title: "Loan Number",
    dataIndex: "loanId",
  },
  {
    title: "Loan Amount",
    className: "loanAmount",
    dataIndex: "loanAmount",
  },
  {
    title: "Loan Due/Status",
    dataIndex: "loanDue",
  },
  {
    title: "Payment",
    dataIndex: "payment",
    scopedSlots: { customRender: "payment" },
  },
];

export default {
  name: "LandingPage",
  data() {
    return {
      buttonName: "New Loan",
      columns,
      newLoanModal: false,
      newLoanDetails: {
        loanAmount: 0,
        loanYears: 10,
      },
    };
  },
  computed: {
    userKey() {
      return this.$store.state.loggedInUser.key;
    },
    userRole() {
      return this.$store.state.loggedInUser.role;
    },
    ...mapGetters("loan", {
      userLoans: "getLoans",
    }),
  },
  methods: {
    payNow(id) {
      alert(id);
    },
    newLoan() {
      this.newLoanModal = !this.newLoanModal;
    },
    handleSubmit() {
      // e.preventDefault();
      this.newLoanForm.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          this.newLoanModal = false;
          this.newLoanDetails.loanAmount = 0;
          this.newLoanDetails.loanYears = 10;
          this.$store
            .dispatch("loan/createLoan", {
              loanAmount: values.newLoanDetails.loanAmount,
              loanYears: values.newLoanDetails.loanYears,
              userKey: this.userKey,
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    approveLoan(loanId) {
      this.$store.dispatch("loan/approve", { loanId });
    },
  },
  beforeCreate() {
    this.newLoanForm = this.$form.createForm(this, { name: "new_loan_form" });
  },
  mounted() {
    this.$store.dispatch("loan/getLoanByUser", this.userKey).catch((err) => {
      console.log(err);
    });
  },
};
</script>
<style scoped>
.landingpage {
  padding: 20px;
}

.landingpage .right {
  float: right;
  background-color: #01d767;
  border-color: #01d767;
  color: #ffffff;
}

.landingpage .left {
  float: left;
}

.clearfix {
  overflow: auto;
  margin-bottom: 20px;
}

.pay-btn {
  background-color: #01d767;
  border-color: #01d767;
  color: #ffffff;
}
</style>
