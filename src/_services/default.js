import axios from 'axios'
import { API_ROOT } from 'config'
import qs from 'qs'
import _ from 'lodash'
import camelcaseKeysDeep from 'camelcase-keys-deep'


export const itunesApi = axios.create({
  baseURL: 'https://itunes.apple.com/search',
  timeout: 60000,
  headers: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  }
})