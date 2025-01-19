import { ChangePassword, CreateUserDto, Login, Session, Token } from "./types";
import { ContentType, HttpClient, RequestParams } from "../http-client";
import { getDefaultHeaders } from "../../utils/headers";

export class Auth<
  SecurityDataType = unknown
> extends HttpClient<SecurityDataType> {
  register = (data: CreateUserDto, params: RequestParams = {}) =>
    this.request<any, Token>({
      path: `/Auth/register`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });

  login = async (data: Login, params: RequestParams = {}) => {
    try {
      const response = await this.request<any, Token>({
        path: `/Auth/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      });
      console.log("Login response:", response);
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  changePassword = (data: ChangePassword, params: RequestParams = {}) =>
    this.request<any, Token>({
      path: `/Auth/changePassword`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });

  logout = (params: RequestParams = {}) =>
    this.request<any, boolean>({
      path: `/Auth/logout`,
      method: "POST",
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });

  getSession = (params: RequestParams = {}) =>
    this.request<any, Session>({
      path: `/Auth/session`,
      method: "GET",
      secure: true,
      ...params,
    });
}
