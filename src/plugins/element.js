import Vue from 'vue'
import {
  Button,
  Input,
  InputNumber
} from 'element-ui'

import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.use(Button)
Vue.use(Input)
Vue.use(InputNumber)
