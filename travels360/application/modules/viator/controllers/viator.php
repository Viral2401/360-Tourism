<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Viator extends MX_Controller {

  function __construct()
  {
        parent::__construct();


      $this->data['lang_set'] = $this->session->userdata('set_lang');
      $this->load->helper('text');
        $chk = app()->service('ModuleService')->isActive('Viator');
        if ( ! $chk) {
            backError_404($this->data);
        }
        $this->data['phone'] = $this->load->get_var('phone');
        $this->data['contactemail'] = $this->load->get_var('contactemail');
        $defaultlang = pt_get_default_language();
        if(empty($this->data['lang_set'])){
          $this->data['lang_set'] = $defaultlang;
        }
        $this->lang->load("front",$this->data['lang_set']);
    }

	public function index()
	{
        $settings = app()->service("ModuleService")->get('Viator')->settings;
        $this->data['affid'] = $settings->affid;
        $this->data['iframeID'] = $settings->iframeID;
        $this->setMetaData($settings->headerTitle);
        $loadheaderfooter = $settings->showHeaderFooter;

        header('X-Frame-Options: ALLOW');

        $isMobile = $_GET['mobile'];
        if ($loadheaderfooter == "no" || $isMobile == "yes") {
            $this->theme->partial('modules/viator/index',$this->data);
        }else{
            $this->theme->view('modules/viator/index',$this->data, $this);
        }

    }

    public function search()
    {
        $uri = explode("/",uri_string());

        $country = $uri[2];
        $location = $uri[3];
        $startDate = $uri[4];
        $endDate = $uri[5];
        $locate = $location.','.$country;
        $secretKey = "380374363657375804";
        $url = "https://viatorapi.viator.com/service/search/freetext?apiKey=380374363657375804";
        $payload = array("text"=>$locate,"startDate"=>$startDate,"endDate"=>$endDate);
        $headers  = array("Content-Type:application/json");

        $response = $this->curl_call('post',$url,json_encode($payload),$headers);
        $results = json_decode($response);
        /* Json array result have multiple sub arrays, in result there is data[0] array and then nested arrays are
        catIds and subCatIds, data[0] array have all other values of each product*/
//        dd($result->data[0]->data);
        $this->data['results'] = $results;
        $this->theme->view('modules/tours/viator/listing', $this->data, $this);
    }

    public function searchDetail()
    {
        $uri = explode("/",uri_string());
        $productCodes[0] = $uri[2];
        $code = $uri[2];
        $secretKey = "380374363657375804";
        $url = "http://viatorapi.viator.com/service/product?code=".$code."&apiKey=380374363657375804";
        $getPayload = array("code" => $code);
        $headers = array("Content-Type:application/json");
        $detailResponse = $this->curl_call('get',$url,json_encode($getPayload),$headers);
        $details = json_decode($detailResponse);
        $this->data['details'] = $details;
        $this->theme->view('modules/tours/viator/details',$this->data,$this);
    }

    function checkAvailability()
    {
        $uri = explode("/", uri_string());
//        dd($uri);
        $date = str_replace('-','/',$uri[3]);
        $endDate = str_replace('-','/',$uri[5]);
        $totalCost = $uri[19];
        $singleCost = $uri[17];
        $currencyCode = $uri[21];
        $adults=0;
        $seniors=0;
        $youth=0;
        $child=0;
        $infant=0;
        $picture = str_replace('_','/',$uri[23]);
        $rating = $uri[25];
        $title = str_replace('%20',' ',$uri[27]);
        $location = str_replace('%20', ' ', $uri[29]);
        $duration = str_replace('%20',' ',$uri[31]);
        $code = $uri[33];

        if($uri[6] == "adults" && $uri[7] > 0)
        {
            $adults = $uri[7];
        }
        if($uri[8] == "seniors" && $uri[9] > 0)
        {
            $seniors = $uri[9];
        }
        if($uri[10] == "youth" && $uri[11] > 0)
        {
            $youth = $uri[11];
        }
        if($uri[12] == "child" && $uri[13] > 0)
        {
            $child = $uri[13];
        }
        if($uri[14] == "infant" && $uri[15] > 0)
        {
            $infant = $uri[15];
        }
//        dd($uri);
        $arr = new stdClass();
        $arr->code = $code;
        $arr->title = $title;
        $arr->thumbnail = $picture;
        $arr->stars = $rating;
        $arr->title = $title;
        $arr->location = $location;
        $arr->duration = $duration;
        $arr->tourType = "viator";
        $arr->adults = $adults;
        $arr->adultprice = $adults * $singleCost;
        $arr->seniors = $seniors;
        $arr->seniorprice = $seniors * $singleCost;
        $arr->youth = $youth;
        $arr->youthprice = $youth * $singleCost;
//        dd($arr->youthprice);
        $arr->children = $child;
        $arr->childprice = $child * $singleCost;
        $arr->infants = $infant;
        $arr->infantprice = $infant * $singleCost;
//        dd($arr->infantprice);
        $arr->startDate = $date;
        $arr->endDate = $endDate;
        $arr->singleCost = $singleCost;
        $arr->totalCost = $totalCost;
        $arr->subTotal = ($arr->adultprice + $arr->seniorprice) + ($arr->youthprice + $arr->childrenprice) + $arr->infantprice;
        $arr->price = $arr->subTotal;
        $arr->currSymbol = $currencyCode;
        $checkDate = str_replace("-","",$date);
//        dd($arr);
        $this->data['module'] = $arr;
        $this->data['appModule'] = 'tours';
        $this->data['date'] = $date;
//        dd($arr->youthprice);

        $this->theme->view('booking', $this->data, $this);
    }

    function beforeBooking($arr)
    {
        dd("here");
        $uri = explode('/', uri_string());
        $productCodes[] = $uri[3];
        $startDate = $uri[5];
        $endDate = $uri[7];
        $secretKey = "380374363657375804";
        $url = "https://viatorapi.viator.com/service/available/products?apiKey=".$secretKey;
        $getPayload = array("productCodes" => $productCodes,"startDate"=>$startDate,"endDate"=>$endDate);
        $headers = array("Content-Type:application/json","Accept:application/json");
        $result = $this->curl_call('post',$url,json_encode($getPayload),$headers);
        $result = json_decode($result);
//        dd($result->data[0]);
        if(!empty($result->data))
        {
            $data = json_encode($result->data[0]);
            $data = json_decode($data, true);
            $availableDates= $data['pas']['tourGrades']['DEFAULT']['availDates'][0]['dateList'];
            $availableDates = explode(' ',$availableDates);
            dd($availableDates);
        }
        else{
            echo "not Available";
            dd($result);
        }
    }

    function curl_call($method,$url, $params, $headers = array())
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        if (!empty($headers)) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }
        if($method == 'post')
        {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        }
        else
        {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
            $url = $url."?".http_build_query($params);
        }
        $content = curl_exec($ch);
        $err = curl_error($ch);

        curl_close($ch);

        if ($err) {
            return $err;
        } else {
            return $content;
        }
    }
}