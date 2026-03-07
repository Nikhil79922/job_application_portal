import { UAParser } from "ua-parser-js";

export class UserAgentParser {
    parse(userAgentString: string) {
        const parser = new UAParser(userAgentString);
        return parser.getResult();
    }
}

