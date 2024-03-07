export const enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export class HttpBuilder {
  private status = HttpStatus.OK;

  setStatus(status: HttpStatus): HttpBuilder {
    this.status = status;
    return this;
  }

  json(body: object): Response {
    return new Response(JSON.stringify(body), {
      status: this.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  finish(): Response {
    return new Response(null, {
      status: this.status,
    });
  }
}

export class HttpResponse {
  static builder(): HttpBuilder {
    return new HttpBuilder();
  }

  static ok(): HttpBuilder {
    return new HttpBuilder().setStatus(HttpStatus.OK);
  }

  static badRequest(): HttpBuilder {
    return new HttpBuilder().setStatus(HttpStatus.BAD_REQUEST);
  }

  static notFound(): HttpBuilder {
    return new HttpBuilder().setStatus(HttpStatus.NOT_FOUND);
  }
}
