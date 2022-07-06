<?php if($this->session->flashdata('flashmsgs')){ echo NOTIFY; } ?>
<form action="<?php echo base_url('admin/viator/update_settings'); ?>" method="POST">
    <div class="panel panel-default">
    <div class="panel-heading">
        <span class="panel-title pull-left">Viator Settings</span>
        <div class="clearfix"></div>
    </div>
    <div class="panel-body">
        <div class="spacer20px">
            <div class="panel-body">
                <div class="form-horizontal  col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <div class="form-group">
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <td>Show Header/Footer</td>
                                        <td>
                                            <select  class="form-control" name="showHeaderFooter">
                                                <option  value="yes" <?php if($moduleSetting->settings->showHeaderFooter == "yes"){ echo "selected";} ?>   >Enable</option>
                                                <option  value="no"  <?php if($moduleSetting->settings->showHeaderFooter == "no"){ echo "selected";} ?>  >Disable</option>
                                            </select>
                                        </td>
                                        <td>Enable/Disable to load header/footer </td>
                                    </tr>
                                    <tr>
                                        <td>Viator Desktop URL</td>
                                        <td>
                                            <input type="" class="form-control" name="affid" placeholder="Affiliate ID" value="<?php echo $moduleSetting->settings->affid;?>" />
                                        </td>
                                        <td>Your affiliate code can be find at the end of the URL from viator </td>
                                    </tr>
                                    <tr>
                                        <td>Viator Mobile URL</td>
                                        <td>
                                        <input type="" class="form-control" name="iframeID" placeholder="Iframe ID" value="<?php echo $moduleSetting->settings->iframeID;?>" />
                                        </td>
                                        <td>Input your Travel Start Iframe ID here</td>
                                        </tr>
                                    <tr>
                                        <td>Header title</td>
                                        <td>
                                            <input type="text" name="headerTitle" class="form-control" placeholder="title" value="<?php echo $moduleSetting->settings->headerTitle;?>" />
                                        </td>
                                        <td>Write your listing page header title here</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="panel-footer">
        <button type="submit" class="btn btn-primary"><i class="fa fa-save"></i> Submit</button>
    </div>
    </div>
</form>