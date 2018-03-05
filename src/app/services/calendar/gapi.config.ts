import {environment} from "../../../environments/environment"

const CLIENT_ID = environment.production
  ? '57344781856-5g0quuin3l845gmtjbepllpg7mir6eef.apps.googleusercontent.com'
  : '57344781856-79hcun89s3lsaimo8086e9pqmgo4uavv.apps.googleusercontent.com'

const API_KEY = environment.production
  ? 'AIzaSyBlm-TsqAHnsazKfouXDWf8RoMjYq--AUI'
  : 'AIzaSyDGe0IAMJilnIpQYapviFBjO8rQppho3mA'

const gapiConfig = {
  apiKey: API_KEY,
  clientId: CLIENT_ID,
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  scope: "https://www.googleapis.com/auth/calendar"
}

export default gapiConfig