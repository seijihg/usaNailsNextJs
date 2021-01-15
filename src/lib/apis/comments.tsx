import { baseUrl } from "../api";

export const updateComment = async (
  updatedComment: string,
  id: string,
  token: string | undefined
) => {
  const res = await fetch(`${baseUrl}/api_v1/comment/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ content: updatedComment }),
  });

  const comments = await res.json();
  return comments;
};

export const deleteComment = async (id: string, token: string | undefined) => {
  const res = await fetch(`${baseUrl}/api_v1/comment/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return await res.json();
};
