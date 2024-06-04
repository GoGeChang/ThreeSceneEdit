import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import "@/assets/style/resetElement.scss";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(ElementPlus, { locale: zhCn }).use(router).use(pinia);
app.mount("#app");

const modulesComponent = import.meta.glob(
  "./components/globalComponents/*/*.vue",
  {
    eager: true,
  }
);

Object.keys(modulesComponent).forEach((filename) => {
  // 获取组件配置
  const componentName = filename
    .split("/")
    .pop()
    .replace(/\.\w+$/, "");

  const component =
    modulesComponent[filename].default || modulesComponent[filename];
  app.component(componentName, component);
});
