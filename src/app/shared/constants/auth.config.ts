import {AuthServiceConfig} from "angular4-social-login";
import {GoogleLoginProvider} from "angular4-social-login";
import {environment} from "../../../environments/environment"


export const CLIENT_ID =
// '57344781856-5g0quuin3l845gmtjbepllpg7mir6eef.apps.googleusercontent.com'
  environment.production
    ? '57344781856-5g0quuin3l845gmtjbepllpg7mir6eef.apps.googleusercontent.com'
    : '57344781856-79hcun89s3lsaimo8086e9pqmgo4uavv.apps.googleusercontent.com'

export function provideConfig() {
  return new AuthServiceConfig([{
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(CLIENT_ID)
  }]);
}
