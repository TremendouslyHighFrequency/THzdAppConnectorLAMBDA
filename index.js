const wasm = require("ergo-lib-wasm-nodejs"); // await

var address, proof, sm, request;

exports.handler = async (event) => {
    
    console.log('Hit the lambda');
    console.log(event.body);

    request = JSON.parse(event.body);

    address = request.address;
    proof = request.proof;
    sm = request.signedMessage;
    
    console.log(address);
    console.log(proof);
    console.log(sm);
    
    const verified = wasm.verify_signature(
        wasm.Address.from_mainnet_str(address),
        Buffer.from(sm, "utf-8"),
        Buffer.from(proof, "hex")
    );

    const response = {
        statusCode: 200,
        body: JSON.stringify({'verified': verified}),
    };
    return response;
};
