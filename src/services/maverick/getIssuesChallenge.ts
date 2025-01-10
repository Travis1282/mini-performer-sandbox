import { client } from "./maverick-client";

export interface GetIssuesChallengeOptions {
  init?: Omit<RequestInit, "body">;
}

export function getIssuesChallenge(options?: GetIssuesChallengeOptions) {
  return client.GET("/rest/events/issue-challenge", {
    ...(options?.init ?? {}),
  });
}
