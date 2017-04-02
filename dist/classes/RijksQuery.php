<?php
/**
 * Query the RijksMuseum API.
 *
 * @author Dan Devine
 * @since 0.0.1
 */
class RijksQuery
{
    public $lang   = 'en';
    public $format = 'json';

    public function __construct($lang, $auth, $format)
    {
        $this->lang   = $lang;
        $this->auth   = $auth;
        $this->format = $format;
    }

    /**
     * Gets our auth deatils and basic config privately
     * @return string  $config
     */
    private function rijksAuth()
    {
        $config = 'https://www.rijksmuseum.nl/api/'. $this->lang .'/collection?key='. $this->auth . '&format='. $this->format .'&imgonly=True&';

        return $config;
    }
    /**
     * Sets a search term
     * @param string $setQuery
     */
    public function setSearch($setQuery)
    {
        $this->query = $setQuery;
    }
    /**
     * Gets the search term
     * @return string
     */
    private function getSearch()
    {
        return $this->query;
    }

    /**
     * Builds the request url from the auth and the search term
     * @return string
     */
    public function setQuery()
    {
        $auth  = $this->rijksAuth();
        $query = $this->getSearch();
        $path  = $auth . "q=" . $query;

        return $path;
    }

    /**
     * Makes the request
     * @return array json
     */
    private function getObject()
    {
        $path = $this->setQuery();

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $path);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $resp = curl_exec($curl);
        curl_close($curl);

        $result = json_decode($resp, true);

        return $result;

    }

    public function artObject($index)
    {

        $result   = $this->getObject();

        $webImage = $result['artObjects'][$index]['webImage']['url'];
        $title    = $result['artObjects'][$index]['title'];
        $id       = $result['artObjects'][$index]['id'];
        $maker    = $result['artObjects'][$index]['principalOrFirstMaker'];

       /**
        * Simplified array of key object attributes.
        * @var array
        */
       $artObject = array(
           'image' => $webImage,
           'title' => $title,
           'id'    => $id,
           'maker' => $maker
       );

       return $artObject;
    }
}
