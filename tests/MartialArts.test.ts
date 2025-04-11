import {expect, test, beforeAll} from "vitest";
import app from "../src/index";
import { MongoDB } from "../src/services/MongoDB";

class MartialArtsTest {
    static instance: any

    martialArtId: string = "";

    constructor(){
        if(!MartialArtsTest.instance){
            MartialArtsTest.instance = this;
        }
        return MartialArtsTest.instance
    }

    setMartialArtId(martialArtId: string) {
        this.martialArtId = martialArtId;
    }

    getMartialArtId() {
        return this.martialArtId;
    }
}

beforeAll(async () => {
    const mongo = new MongoDB({uri: "mongodb://mongo:mongo@localhost:8086/grappling?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=default"});
    const { error, message } = await mongo.connect()

    if(error){
        console.error(message)
        process.exit(1)
    }
})

test("Post new martial art", async () => {
    const martialArtTest = new MartialArtsTest();

    const martialArt = {
        name: "Test martial art",
        languages: [
            { language: "en", name: "Test martial art"}
        ],
        description: "Test martial art description",
        history: "Test martial art history",
        founder: "Test martial art founder",
    };

    const res = await app.request("/martial-arts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(martialArt)
    });

    const data = await res.json();

    martialArtTest.setMartialArtId(data.art._id.toString());

    expect(res.status).toBe(201);
    expect(data.message).toBe("New art created");
    expect(data.art.name).toBe(martialArt.name);
    expect(data.art.languages.length).toBe(1);
    expect(data.art.description).toBe(martialArt.description);
    expect(data.art.history).toBe(martialArt.history);
    expect(data.art.founder).toBe(martialArt.founder);
});

test("Get all martial arts", async () => {
    const res = await app.request("/martial-arts");
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.message).toBe("Martial arts get");
    expect(data.arts.length).toBeGreaterThan(0);
});

test("Get martial art by id", async () => {
    const martialArtTest = new MartialArtsTest();

    const res = await app.request(`/martial-arts/${martialArtTest.getMartialArtId()}`);
    const data = await res.json();    

    expect(res.status).toBe(200);
    expect(data.message).toBe("Martial art get");
    expect(data.art._id.toString()).toBe(martialArtTest.getMartialArtId());
});

test("Get martial arts by language", async () => {
    const res = await app.request("/martial-arts/lang/en");
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.message).toBe("Martial arts get");
    expect(data.arts.length).toBeGreaterThan(0);
});

test("Get martial art by language", async () => {
    const martialArtTest = new MartialArtsTest();

    const res = await app.request(`/martial-arts/lang/en/${martialArtTest.getMartialArtId()}`);
    const data = await res.json();

    console.log(data);

    expect(res.status).toBe(200);
    expect(data.message).toBe("Martial art get");
    expect(data.art._id.toString()).toBe(martialArtTest.getMartialArtId());
});

test("Update martial art", async () => {
    const martialArtTest = new MartialArtsTest();

    const res = await app.request(`/martial-arts/${martialArtTest.getMartialArtId()}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "Test martial art updated",
            languages: [
                { language: "en", name: "Test martial art updated"}
            ],
            description: "Test martial art description updated",
            history: "Test martial art history updated",
            founder: "Test martial art founder updated",
        })
    })

    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.message).toBe("Martial art updated")
    expect(data.art.name).toBe("Test martial art updated")
    expect(data.art.languages.length).toBe(1)
    expect(data.art.description).toBe("Test martial art description updated")
    expect(data.art.history).toBe("Test martial art history updated")
    expect(data.art.founder).toBe("Test martial art founder updated")
});

test("Delete martial art", async () => {
    const martialArtTest = new MartialArtsTest()

    const res = await app.request(`/martial-arts/${martialArtTest.getMartialArtId()}`, {
        method: "DELETE"
    })
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.message).toBe("Martial art deleted")
})