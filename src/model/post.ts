export default interface Post {
    id: string,
    description: string,
    imageUrl: string,
    alt: string
}

export type PostRequest = Omit<Post, "id">;