import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(ElementPlus, { locale: zhCn }).use(router);
app.mount("#app");
