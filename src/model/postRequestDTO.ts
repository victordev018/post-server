export default class PostRequestDTO {

    description: string | null;
    imageUrl: string | null;
    alt: string | null;

    constructor(description?:string, imageUrl?:string, alt?:string) {
        this.description = description? description : null;
        this.imageUrl = imageUrl? imageUrl : null;
        this.alt = alt? alt : null;
    }

}