import Handlebars from 'handlebars'

// Caching is deleted because it causes trouble when loading specific questions in already selected and rendered thread

function loadTemplate(page, templateName) {
    let templateUrl = `./resources/views/${page}/${templateName}.handlebars`;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: templateUrl,
            success: function (data) {
                let template = Handlebars.compile(data);
                resolve(template);
            },
            error: function (err) {
                reject(err);
            }
        })
    });
}

class TemplateGenerator {
    load(page, templateName) {
        return loadTemplate(page, templateName);
    }
}

var templateGenerator = new TemplateGenerator();

export {templateGenerator};