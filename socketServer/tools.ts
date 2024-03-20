class connectManager {

    public connectionPool : Map<number, any>;

    constructor()  {
        this.connectionPool = new Map();
    }
    addConnection(uid : number , socket : any) {

        let socketData = {
            'socketid' : this.connectionPool.size,
            'socket' : socket
        }
        this.connectionPool.set(uid, socketData);
    }

    getSocket(uid : number) {
        return this.connectionPool.get(uid)['socket'];
    }

    getSocketId(uid : number) {
        return this.connectionPool.get(uid)['socketid'];
    }

}
//TODO: temporary remove this
class SessionManager {
    public sessionPool : Map<number, number>;

    constructor()  {
        this.sessionPool = new Map();
    }

    setSession(uid : number) {
        this.sessionPool.set(uid, 1);
    }

    getSession(uid : number) {
        return this.sessionPool.get(uid);
    }

    nextSession(uid : number) {
        let session : any  = this.sessionPool.get(uid);
        this.sessionPool.set(uid, Number(session)+1);
    }

  
}

class CEvent {
    Etype : string;
    
    changeState: ((value: string) => void) | undefined;
    rejectPromise: ((reason?: any) => void) | undefined;
    waiting: Promise<any>;
    constructor(etype : string) {
        this.Etype = etype;
        
        this.waiting = new Promise((res,rej)=> {
            this.changeState = res;
            this.rejectPromise = rej;
        });
    }

    done () {
        if (this.changeState) {
            this.changeState("done");
        } else {
            console.error('changeState is not defined');
        }
    }

    reject (reason : any) {
        if (this.rejectPromise) {
            this.rejectPromise(reason);
        } else {
            console.error('rejectPromise is not defined');
        }
    }
}


class EventManager {

    eventPool : Map<number,any>;

    constructor() {
        this.eventPool = new Map();
    }

    closeEvent(uid : string , sid : string) {
        let tempEvnt = this.eventPool.get(Number(uid));
        tempEvnt.delete(Number(sid));
    }


    // there are 2 types of events for a user under a specific session
    // 1) ui event
    // 2) input event
    on(uid : string , sid : string) {

        let State : Map<any,any> = new Map();
        State.set("ui", new CEvent("ui"));
        State.set("input", new CEvent("input"));
        //so on ....

        let Event : Map<any,any> = new Map(); 
        Event.set(Number(sid), State);
        this.eventPool.set(Number(uid) , Event);
    }

    getEvent(uid : string, sid : string) {
        return this.eventPool.get(Number(uid)).get(Number(sid));
    }



    emit (uid : string , sid : string , state : string) {
        let event = this.eventPool.get(Number(uid)).get(Number(sid)).get(state);
        event.done();
    }

    cancel (uid : string , sid : string) {
        let event = this.eventPool.get(Number(uid)).get(Number(sid));
        event.reject("cancelled");
    }
}


let conManager = new connectManager();
let EventHandler = new EventManager();
let sessionManager = new SessionManager();


export {conManager, EventHandler, sessionManager};