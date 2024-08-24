function detectLanguage(ctx) {
    if (ctx.request.query === "/start") {
        return ctx.injector.defaultLanguage;
    }
    return $caila.detectLanguage([ctx.request.query])[0];
}

function redirectToBot(botId, ctx, targetState) {
    targetState = targetState || "/Hello";
    var params = ctx.session || {};

    ctx.response.replies = ctx.response.replies || [];
    ctx.response.replies.push({
        type: "context-switch",
        targetBotId: botId,
        targetState: targetState,
        parameters: params
    });
}

function processRequest(ctx) {
    var lang = detectLanguage(ctx);
    var botId = ctx.injector.bots[lang];

    if (botId) {
        redirectToBot(botId, ctx);
    } else {
        $reactions.answer(ctx.injector.unknownLanguageMessage);
    }
}