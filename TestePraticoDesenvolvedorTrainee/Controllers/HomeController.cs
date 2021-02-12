using Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestePraticoDesenvolvedorTrainee.Models;
using TestePraticoDesenvolvedorTrainee.DataSource;

namespace TestePraticoDesenvolvedorTrainee.Controllers
{
    public class HomeController : Controller
    {

        private readonly Contexto ctx = new Contexto();

        public ActionResult Index()
        {
            return RedirectToAction("CadastroCliente");
        }

        //public ActionResult About()
        //{
        //    ViewBag.Message = "Your application description page.";

        //    return View();
        //}

        //public ActionResult Contact()
        //{
        //    ViewBag.Message = "Your contact page.";

        //    return View();
        //}

        public ActionResult CadastroCliente()
        {

            return View();
        }

        public ActionResult AdicionarCliente()
        {
            return PartialView(new Cliente());
        }



        [HttpPost]
        public JsonResult AdicionarCliente(Cliente cliente)
        {
            try
            {
                if (!ModelState.IsValid)
                {

                    return Json(GetModelStateErrors(ModelState));
                }

                Cliente.Inserir(cliente);

            }
            catch (Exception r)
            {

                return Json(false);
            }

            return Json(cliente);

        }

        [HttpPost]
        public JsonResult EditarCliente(Cliente cliente)
        {
            try
            {
                if (!ModelState.IsValid)
                {

                    return Json(GetModelStateErrors(ModelState));
                }

                Cliente.Alterar(cliente);

            }
            catch (Exception r)
            {

                return Json(false);
            }

            return Json(cliente);
        }

        public ActionResult EditarCliente(int Identificador)
        {

            var cliente = Cliente.SelecionarCliente(Identificador);

            if (cliente != null)
            {
                ViewBag.LstLoja = Loja.ListarLojas().Where(m => !cliente.Lojas.Select(x => x.Identificador).Contains(m.Identificador)).Select(m=> new SelectListItem() { 
                Text = m.Nome,
                Value = m.Identificador.ToString()
                }).ToList();

                return PartialView(cliente);
            }

            return PartialView("AdicionarCliente");
        }

        public ActionResult ListarClientes()
        {

            ViewBag.ListarClientes = Cliente.ListarClientes();

            return PartialView();
        }
        [HttpPost]
        public JsonResult ExcluirCliente(int Identificador)
        {
            try
            {

                Cliente.Apagar(Identificador);

                return Json(true);
            }
            catch (Exception r)
            {

                return Json(false);
            }
        }

        private string GetModelStateErrors(ModelStateDictionary modelState)
        {
            string msg = "";
            foreach (var values in modelState.Values.ToList())
            {
                foreach (var error in values.Errors.ToList())
                {
                    msg += "* " + error.ErrorMessage + " <br/>";
                }
            }
            return msg;
        }

        public ActionResult AdicionarEndereco()
        {
            return PartialView(new Endereco());
        }
        [HttpPost]
        public JsonResult AdicionarEndereco(Endereco endereco)
        {
            try
            {
                if (!ModelState.IsValid)
                {

                    return Json(GetModelStateErrors(ModelState));
                }

                Endereco.Inserir(endereco);

            }
            catch (Exception r)
            {

                return Json(false);
            }

            return Json(true);
        }
        public ActionResult EditarEndereco(int Identificador)
        {
            Endereco endereco = Endereco.SelecionarEndereco(Identificador);
            if (endereco != null)
            {
                return PartialView(endereco);
            }
            return PartialView("AdicionarEndereco");
        }

        [HttpPost]
        public JsonResult EditarEndereco(Endereco endereco)
        {
            try
            {
                if (!ModelState.IsValid)
                {

                    return Json(GetModelStateErrors(ModelState));
                }

                Endereco.Alterar(endereco);

            }
            catch (Exception r)
            {

                return Json(false);
            }

            return Json(true);
        }


        [HttpPost]
        public JsonResult ExcluirEndereco(int Identificador)
        {
            try
            {

                Endereco.Apagar(Identificador);

                return Json(true);
            }
            catch (Exception r)
            {

                return Json(false);
            }
        }

        [HttpPost]
        public JsonResult IncluirClienteLoja(int IdLoja, int IdCliente)
        {
            try
            {

                Cliente.IncluirClienteLoja(IdLoja, IdCliente);

                return Json(true);
            }
            catch (Exception r)
            {

                return Json(false);
            }
        }

        [HttpPost]
        public JsonResult ExcluirClienteLoja(int IdLoja, int IdCliente)
        {
            try
            {

                Cliente.ApagarClienteLoja(IdLoja,IdCliente);

                return Json(true);
            }
            catch (Exception r)
            {

                return Json(false);
            }
        }
    }
}