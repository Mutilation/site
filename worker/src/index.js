// src/index.js
var src_default = {
	async fetch(request, env, ctx) {
	  let response, json;
	  try {
		if (request.method == "POST") {
		  json = await request.json();
		  response = await handle(json, env);
		  response.headers.set("content-type", "application/json;charset=UTF-8");
		} else if (request.method === "OPTIONS") {
		  response = handleOptions(request);
		  response.headers.set("content-type", "application/json;charset=UTF-8");
		}
	  } catch (err) {
		return new Response(JSON.stringify({ error: err.message }), {
		  headers: {
			"content-type": "application/json;charset=UTF-8"
		  }
		});
	  }
	  return response || new Response(null);
	}
  };
  var corsHeaders = {
	"Access-Control-Allow-Origin": "https://humancoder.ai",
	"Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
	"Access-Control-Max-Age": "86400"
  };
  async function handle(json, env) {
	let response;
	if (json.type == "email") {
	  try {
		await env.hcWaitlist.put(json.email, +Date.now());
		response = new Response(
		  JSON.stringify({ result: "success" }),
		  {
			headers: corsHeaders
		  }
		);
	  } catch (err) {
		response = new Response(
		  JSON.stringify({ error: err.message }),
		  {
			headers: corsHeaders
		  }
		);
	  }
	} else {
	  response = new Response(
		JSON.stringify({ error: "type not supported" }),
		{
		  headers: corsHeaders
		}
	  );
	}
	return response;
  }
  function handleOptions(request) {

	  let respHeaders = {
		...corsHeaders,
		"Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers")
	  };
	  return new Response(null, {
		headers: respHeaders
	  });
	
  }
  export {
	src_default as default
  };
  //# sourceMappingURL=index.js.map
  