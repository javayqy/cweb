import Vue from "vue";

import {
  Button,
  Input,
  Form,
  FormItem,
  Row,
  Col,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Link,
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Divider,
  Dialog,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Card,
  Image,
  Message,
  MessageBox,
  Upload,
  Tabs,
  TabPane,
  Radio,
  Table,
  TableColumn,
  Tag,
  Popconfirm,
  Popover,
  PageHeader,
  Breadcrumb,
  Tree,
  Alert,
  Switch,
  Progress,
  Select,
  Option,
  OptionGroup,
  Pagination
} from "element-ui";

Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Link);
Vue.use(Icon);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Avatar);
Vue.use(Divider);
Vue.use(Dialog);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Card);
Vue.use(Image);
Vue.use(Upload);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Radio);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tag);
Vue.use(Popconfirm);
Vue.use(Popover);
Vue.use(PageHeader);
Vue.use(Breadcrumb);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Switch);
Vue.use(Progress);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Pagination);

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
