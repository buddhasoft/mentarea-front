// import {AuthServiceConfig} from "angular4-social-login";
import {GoogleLoginProvider} from "angular4-social-login";
import {environment} from "../../../environments/environment"

// export function provideConfig() {
//   return new AuthServiceConfig([{
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider(CLIENT_ID)
//   }]);
// }

export const CLIENT_ID =
  // '57344781856-5g0quuin3l845gmtjbepllpg7mir6eef.apps.googleusercontent.com'
  environment.production
  ? '57344781856-5g0quuin3l845gmtjbepllpg7mir6eef.apps.googleusercontent.com'
  : '57344781856-79hcun89s3lsaimo8086e9pqmgo4uavv.apps.googleusercontent.com'

const API_KEY =
  'AIzaSyDGe0IAMJilnIpQYapviFBjO8rQppho3mA'
  // environment.production
  // ? 'AIzaSyBlm-TsqAHnsazKfouXDWf8RoMjYq--AUI'
  // : 'AIzaSyDGe0IAMJilnIpQYapviFBjO8rQppho3mA'

export const GAPI_CONFIG = {
  apiKey: API_KEY,
  clientId: CLIENT_ID,
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  scope: "https://www.googleapis.com/auth/calendar"
}
