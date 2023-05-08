<template>
  <div class="Userlist">
    <el-input
      placeholder="Please input the searching infomation...."
      v-model="input2"
      style="width: 350px"
      @change="searchUserInfoMed"
    >
      <template slot="append">
        <el-button slot="append" icon="el-icon-search"></el-button
      ></template>
    </el-input>
    <el-button type="text" @click="dialogVisible = true" class="dialog_btn"
      >Add Users</el-button
    >
    <el-dialog
      title="New Users"
      :visible.sync="dialogVisible"
      width="50%"
      :show-close="false"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <el-input v-model="iptUsername" placeholder="Enter username"></el-input>
      <el-input
        v-model="password"
        placeholder="Enter password"
        type="password"
        style="margin: 20px 0 20px 0"
      ></el-input>
      <el-input
        v-model="again_password"
        placeholder="Ensure the password"
        type="password"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="registerUserMed">OK </el-button>
      </span>
    </el-dialog>
    <el-table :data="tableData" style="padding-top: 30px" v-show="!notFound">
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <!-- <el-table-column prop="password" label="密码"> </el-table-column> -->
      <el-table-column prop="role" label="Role"></el-table-column>
      <el-table-column align="left" prop="operate" label="Operate">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="[]" style="padding-top: 30px" v-show="notFound">
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="role" label="Role"></el-table-column>
      <el-table-column align="left" prop="operate" label="Operate">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import {
//   getUserInfo,
//   registerUser,
//   deleteUser,
//   searchUserInfo,
// } from "@/requestApi/mainPage";
import {
  getUserInfo,
  searchUserInfo,
  deleteUser,
  userRegister,
} from "@/requestApi/UserModule";
export default {
  data() {
    return {
      input2: "",
      iptUsername: "",
      password: "",
      again_password: "",
      dialogVisible: false,
      tableData: [],
      notFound: false,
      userId: 0,
    };
  },
  mounted() {
    this.userId = localStorage.getItem("userId");
    this.getUserInfoMed();
  },
  methods: {
    closeDialog() {
      this.iptUsername = "";
      this.password = "";
      this.again_password = "";
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.$confirm(
        "This operation will permanently delete the user. Do you want to continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          deleteUser({ id: row.id }).then((res) => {
            if (res.data.code == 200) {
              this.$message("delete successfully!");
              this.getUserInfoMed();
            }
          });
        })
        .catch(() => {});
    },
    getUserInfoMed() {
      getUserInfo(this.userId).then((res) => {
        console.log(res);
        this.tableData = res.data.data.users;
      });
    },
    registerUserMed() {
      if (
        this.iptUsername &&
        this.password === this.again_password &&
        this.password &&
        this.again_password
      ) {
        let options = {
          name: this.iptUsername,
          password1: this.again_password,
          password2: this.again_password,
        };
        userRegister(options).then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message("add user successfully");
            this.dialogVisible = false;
            this.getUserInfoMed();
          } else {
            this.$message(res.data.message);
          }
        });
      } else {
        this.$message({
          message: "输入用户名密码不能为空且确保两次输入的密码一致",
          type: "warning",
        });
      }
    },
    // deleteUserMed() {},
    searchUserInfoMed() {
      let option = {
        username: this.input2,
      };
      if (option.username != "") {
        searchUserInfo(option.username).then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            let option = [];
            option.push(res.data.data);
            this.tableData = option;
            this.notFound = false;
          } else {
            this.notFound = true;
          }
        });
      } else {
        this.getUserInfoMed();
      }
    },
  },
};
</script>

<style lang="scss">
.Userlist {
  .dialog_btn {
    width: 90px;
    height: 40px;
    display: inline-block;
    color: white;
    font-size: 15px;
    background-color: rgb(80, 99, 160);
    text-align: center;
    margin-left: 40px;
  }
}
</style>
