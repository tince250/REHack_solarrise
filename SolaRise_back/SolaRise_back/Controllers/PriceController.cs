using Microsoft.AspNetCore.Mvc;
using SolaRise_back.DTOs;

namespace SolaRise_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PriceController : ControllerBase
    {
        public PriceController()
        {

        }

        [HttpGet]
        [Route("getFullPrice/panel_id={panelId}&rails_id={railsId}&address={address}&longitude={longitude}&latitude={latitude}")]
        public async Task<ActionResult<ListOfPricesDTO>> GetPriceForFullRoof(int panelId, int railsId, String address, decimal longitude, decimal latitude)
        {

            return Ok(findListOfPricesForFullRoof(panelId, railsId, address, longitude, latitude));
        }

        private ListOfPricesDTO findListOfPricesForFullRoof(int panelId, int railsId, String address, decimal longitude, decimal latitude)
        {
            List<int> dimensions = GetDimensions(address, latitude, longitude);
            List<int> rowsAndCols = GetNumberOfRowsAndCols(dimensions[0], dimensions[1]);
            int numOfPanels = rowsAndCols[0] * rowsAndCols[1];
            ListOfPricesDTO listOfPrices = new ListOfPricesDTO();
            listOfPrices.PanelPrice = GetPanelPrice(panelId);
            listOfPrices.NumOfPanels = numOfPanels;
            listOfPrices.InverterPrice = GetInverterPrice(panelId);
            listOfPrices.RailPricePer1m = GetRailsPrice(railsId);
            listOfPrices.RailsPrice = (dimensions[1] - 40) * 2 * GetRailsPrice(railsId) * rowsAndCols[0] / 100;
            listOfPrices.MontagePrice = numOfPanels * 20;
            return listOfPrices;
        }

        [HttpGet]
        [Route("getForPrice/panel_id={panelId}&rails_id={railsId}&address={address}&longitude={longitude}&latitude={latitude}&price={price}")]
        public async Task<ActionResult<ListOfPricesDTO>> GetPriceForPrice(int panelId, int railsId, String address, decimal longitude, decimal latitude, decimal price)
        {
            ListOfPricesDTO listOfPrices = findListOfPricesForFullRoof(panelId, railsId, address, longitude, latitude);
            price -= listOfPrices.InverterPrice;
            decimal priceFor1Panel = listOfPrices.PanelPrice + 2 * listOfPrices.RailPricePer1m * (decimal) 1.06 + 20;
            int numOfPanels = (int) (price / priceFor1Panel);
            listOfPrices.NumOfPanels = numOfPanels;
            listOfPrices.RailsPrice = (2 * listOfPrices.RailPricePer1m * (decimal)1.06) * numOfPanels;
            listOfPrices.MontagePrice = numOfPanels * 20;
            return Ok(listOfPrices);
        }

        [HttpGet]
        [Route("getForBill/panel_id={panelId}&rails_id={railsId}&bill={bill}")]
        public async Task<ActionResult<ListOfPricesDTO>> GetPriceForBill(int panelId, int railsId, decimal bill)
        {

            int numOfPanels = (int)Math.Ceiling(bill * 1000 / (decimal) 0.3 / (GetPanelPower(panelId) * (decimal)4.5 * 30));
            ListOfPricesDTO listOfPrices = new ListOfPricesDTO();
            listOfPrices.PanelPrice = GetPanelPrice(panelId);
            listOfPrices.NumOfPanels = numOfPanels;
            listOfPrices.InverterPrice = GetInverterPrice(panelId);
            listOfPrices.RailPricePer1m = GetRailsPrice(railsId);
            listOfPrices.RailsPrice = (2 * listOfPrices.RailPricePer1m * (decimal)1.06) * numOfPanels;
            listOfPrices.MontagePrice = numOfPanels * 20;
            return Ok(listOfPrices);
        }



        private List<int> GetNumberOfRowsAndCols(int height, int width)
        {
            List<int> rowsAndCols = new List<int>();
            height -= 120;
            width -= 40;

            int numOfRows = height / (200 + 6);
            int numOfColumns = width / (100 + 3);
            rowsAndCols.Add(numOfRows);
            rowsAndCols.Add(numOfColumns);
            return rowsAndCols;
        }

 

        private List<int> GetDimensions(String address, decimal latitude, decimal longitude)
        {
            List<int> dimensions = new List<int>();
            dimensions.Add(400);
            dimensions.Add(700);
            return dimensions;
        }

        private decimal GetPanelPrice(int panelId)
        {
            if (panelId == 0)
                return 1000;
            else if (panelId == 1)
                return 1100;
            else if (panelId == 2)
                return 1050;
            else
                return 1075;
        }

        private decimal GetPanelPower(int panelId)
        {
            if (panelId == 0)
                return 600;
            else if (panelId == 1)
                return 650;
            else if (panelId == 2)
                return 620;
            else
                return 700;
        }

        private decimal GetInverterPrice(int panelId)
        {
            if (panelId == 0)
                return 600;
            else if (panelId == 1)
                return 700;
            else if (panelId == 2)
                return 650;
            else
                return 1000;
        }

        private decimal GetRailsPrice(int railsId)
        {
            if (railsId == 0)
                return 20;
            else if (railsId == 1)
                return 21;
            else if (railsId == 2)
                return 22;
            else
                return 23;
        }
    }
}
